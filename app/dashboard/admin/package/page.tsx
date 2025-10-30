// app/dashboard/admin/packages/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePackages } from '@/lib/hooks/usePackage';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star,
  Package as PackageIcon,
  MapPin,
  Filter,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

interface PackageFormData {
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  isActive: boolean;
}

export default function PackagesAdminPage() {
  const {
    packages,
    loading,
    error,
    total,
    page,
    totalPages,
    creating,
    updating,
    deleting,
    toggling,
    loadPackages,
    savePackage,
    editPackage,
    removePackage,
    toggleStatus,
    clearError,
  } = usePackages();

  const [currentPage, setCurrentPageState] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [formData, setFormData] = useState<PackageFormData>({
    title: '',
    description: '',
    price: 0,
    duration: '',
    location: '',
    images: [''],
    highlights: [''],
    inclusions: [''],
    exclusions: [''],
    isActive: true
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch packages when parameters change
  useEffect(() => {
    loadPackages({
      page: currentPage,
      limit: 10,
      search: debouncedSearch,
      active: statusFilter
    });
  }, [currentPage, debouncedSearch, statusFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPageState(page);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        images: formData.images.filter(img => img.trim()),
        highlights: formData.highlights.filter(h => h.trim()),
        inclusions: formData.inclusions.filter(i => i.trim()),
        exclusions: formData.exclusions.filter(e => e.trim()),
      };

      if (editingPackage) {
        await editPackage(editingPackage._id, cleanedData);
      } else {
        await savePackage(cleanedData);
      }
      resetForm();
      loadPackages({
        page: currentPage,
        limit: 10,
        search: debouncedSearch,
        active: statusFilter
      });
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      await removePackage(id);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    await toggleStatus(id, !currentStatus);
  };

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      location: pkg.location,
      images: pkg.images.length ? pkg.images : [''],
      highlights: pkg.highlights.length ? pkg.highlights : [''],
      inclusions: pkg.inclusions.length ? pkg.inclusions : [''],
      exclusions: pkg.exclusions.length ? pkg.exclusions : [''],
      isActive: pkg.isActive
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      duration: '',
      location: '',
      images: [''],
      highlights: [''],
      inclusions: [''],
      exclusions: [''],
      isActive: true
    });
    setEditingPackage(null);
    setShowForm(false);
  };

  const handleArrayFieldChange = (field: keyof PackageFormData, index: number, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field: keyof PackageFormData) => {
    const currentArray = formData[field] as string[];
    setFormData({ ...formData, [field]: [...currentArray, ''] });
  };

  const removeArrayField = (field: keyof PackageFormData, index: number) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray.length ? newArray : [''] });
  };

  const activePackages = packages.filter(p => p.isActive);
  const avgPrice = packages.length 
    ? packages.reduce((acc, p) => acc + p.price, 0) / packages.length
    : 0;

  return (
    <ProtectedRoute roles={['admin', 'manager']}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Packages Management</h1>
              <p className="text-muted-foreground mt-2">Manage tour packages and offerings</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => loadPackages({ page: currentPage, limit: 10, search: debouncedSearch, active: statusFilter })}
                disabled={loading}
                className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              <button
                onClick={() => setShowForm(true)}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Package
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Packages</p>
                  <p className="text-2xl font-bold text-foreground">{total}</p>
                </div>
                <PackageIcon className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Packages</p>
                  <p className="text-2xl font-bold text-green-600">{activePackages.length}</p>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Price</p>
                  <p className="text-2xl font-bold text-yellow-600">${avgPrice.toFixed(0)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-card rounded-2xl p-6 border shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <select
                  value={statusFilter === undefined ? 'all' : statusFilter.toString()}
                  onChange={(e) => {
                    const value = e.target.value;
                    setStatusFilter(value === 'all' ? undefined : value === 'true');
                    setCurrentPageState(1);
                  }}
                  className="px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Packages Table */}
          <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-pulse flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Loading packages...
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Package</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Duration</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {packages.map((pkg) => (
                        <tr key={pkg._id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                {pkg.images[0] ? (
                                  <img
                                    src={pkg.images[0]}
                                    alt={pkg.title}
                                    className="w-full h-full rounded-lg object-cover"
                                  />
                                ) : (
                                  <PackageIcon className="w-6 h-6 text-primary" />
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-foreground">{pkg.title}</div>
                                <p className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
                                  {pkg.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{pkg.location}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{pkg.duration}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-foreground">${pkg.price}</div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleToggleStatus(pkg._id, pkg.isActive)}
                              disabled={toggling}
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                pkg.isActive 
                                  ? 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200' 
                                  : 'bg-red-100 text-red-800 border border-red-200 hover:bg-red-200'
                              } disabled:opacity-50`}
                            >
                              {pkg.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              {pkg.isActive ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-muted-foreground">
                              {new Date(pkg.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEdit(pkg)}
                                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(pkg._id)}
                                disabled={deleting}
                                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, total)} of {total} results
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePageChange(Math.max(page - 1, 1))}
                          disabled={page === 1}
                          className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (page <= 3) {
                              pageNum = i + 1;
                            } else if (page >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = page - 2 + i;
                            }
                            
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                  page === pageNum
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted/50 text-muted-foreground'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>
                        
                        <button
                          onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
                          disabled={page === totalPages}
                          className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {editingPackage ? 'Edit Package' : 'Add New Package'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-vertical"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 5 Days / 4 Nights"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Dynamic Arrays */}
                {[
                  { key: 'images' as keyof PackageFormData, label: 'Images (URLs)' },
                  { key: 'highlights' as keyof PackageFormData, label: 'Highlights' },
                  { key: 'inclusions' as keyof PackageFormData, label: 'Inclusions' },
                  { key: 'exclusions' as keyof PackageFormData, label: 'Exclusions' }
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {label}
                    </label>
                    <div className="space-y-2">
                      {(formData[key] as string[]).map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayFieldChange(key, index, e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            placeholder={`Enter ${label.toLowerCase().slice(0, -1)}`}
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayField(key, index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayField(key)}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        + Add {label.slice(0, -1)}
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-foreground">
                    Make package active
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={creating || updating}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {(creating || updating) && (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    )}
                    {creating || updating ? 'Saving...' : editingPackage ? 'Update Package' : 'Create Package'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
