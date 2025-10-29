"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllUsers, deleteUser } from "@/lib/redux/userSlice";
import {
  getAllGuides,
  toggleGuideApproval,
  deleteGuide,
} from "@/lib/redux/guideSlice";
import { toast } from "react-toastify";
import {
  Users,
  UserCheck,
  Search,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "guide" | "admin";
}

interface GuideProfile {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  experience?: string;
  hourlyRate?: number;
  profileComplete: boolean;
  specializations?: string[];
  photo?: string;
  isApproved: boolean;
  license?: string;
  description?: string;
}

interface RootState {
  auth: {
    user: User | null;
  };
  user: {
    users: User[];
    loading: boolean;
  };
  guide: {
    guides: GuideProfile[];
    loading: boolean;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { users, loading: usersLoading } = useAppSelector(
    (state: RootState) => state.user
  );
  const { guides, loading: guidesLoading } = useAppSelector(
    (state: RootState) => state.guide
  );

  const [activeTab, setActiveTab] = useState<"users" | "guides">("guides");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterApproval, setFilterApproval] = useState<
    "all" | "approved" | "pending"
  >("all");
  const [selectedGuide, setSelectedGuide] = useState<GuideProfile | null>(null);

  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/login");
      return;
    }
    dispatch(getAllUsers({}));
    dispatch(getAllGuides({}));
  }, [dispatch, user, router]);

  const handleSearch = () => {
    if (activeTab === "users") {
      dispatch(getAllUsers({ search: searchTerm }));
    } else {
      const approved =
        filterApproval === "all" ? undefined : filterApproval === "approved";
      dispatch(getAllGuides({ search: searchTerm, approved }));
    }
  };

  const handleToggleApproval = async (
    guideId: string,
    currentStatus: boolean
  ) => {
    const result = await dispatch(
      toggleGuideApproval({ id: guideId, isApproved: !currentStatus })
    );
    if (toggleGuideApproval.fulfilled.match(result)) {
      toast.success(
        `Guide ${!currentStatus ? "approved" : "unapproved"} successfully!`
      );
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      const result = await dispatch(deleteUser(userId));
      if (deleteUser.fulfilled.match(result)) {
        toast.success("User deleted successfully!");
      }
    }
  };

  const handleDeleteGuide = async (guideId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this guide profile? This action cannot be undone."
      )
    ) {
      const result = await dispatch(deleteGuide(guideId));
      if (deleteGuide.fulfilled.match(result)) {
        toast.success("Guide deleted successfully!");
      }
    }
  };

  const filteredGuides = guides.filter((guide: GuideProfile) => {
    if (filterApproval === "approved") return guide.isApproved;
    if (filterApproval === "pending") return !guide.isApproved;
    return true;
  });

  const stats = {
    totalUsers: users.filter((u: User) => u.role === "user").length,
    totalGuides: guides.length,
    approvedGuides: guides.filter((g: GuideProfile) => g.isApproved).length,
    pendingGuides: guides.filter((g: GuideProfile) => !g.isApproved).length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Users
              </h3>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.totalUsers}
            </p>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Guides
              </h3>
              <UserCheck className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.totalGuides}
            </p>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Approved Guides
              </h3>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.approvedGuides}
            </p>
          </div>
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Pending Approval
              </h3>
              <XCircle className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.pendingGuides}
            </p>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border mb-6">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("guides")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "guides"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Guides Management
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "users"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Users Management
            </button>
          </div>

          <div className="p-6 border-b border-border">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
              {activeTab === "guides" && (
                <select
                  value={filterApproval}
                  onChange={(e) => setFilterApproval(e.target.value as any)}
                  className="px-4 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="all">All Guides</option>
                  <option value="approved">Approved Only</option>
                  <option value="pending">Pending Only</option>
                </select>
              )}
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "guides" ? (
              <div className="space-y-4">
                {guidesLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : filteredGuides.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No guides found
                  </p>
                ) : (
                  filteredGuides.map((guide: GuideProfile) => (
                    <div
                      key={guide._id}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {guide.photo && (
                              <img
                                src={guide.photo}
                                alt={guide.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {guide.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {guide.email}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Mobile:
                              </span>
                              <p className="text-foreground">
                                {guide.mobile || "N/A"}
                              </p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Experience:
                              </span>
                              <p className="text-foreground">
                                {guide.experience || "N/A"}
                              </p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Rate:
                              </span>
                              <p className="text-foreground">
                                {guide.hourlyRate
                                  ? `₹${guide.hourlyRate}/hr`
                                  : "N/A"}
                              </p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Profile:
                              </span>
                              <p
                                className={`font-semibold ${
                                  guide.profileComplete
                                    ? "text-green-600"
                                    : "text-orange-600"
                                }`}
                              >
                                {guide.profileComplete
                                  ? "Complete"
                                  : "Incomplete"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 ml-4">
                          <Button
                            size="sm"
                            variant={
                              guide.isApproved ? "destructive" : "default"
                            }
                            onClick={() =>
                              handleToggleApproval(guide._id, guide.isApproved)
                            }
                            disabled={!guide.profileComplete}
                            className="min-w-[120px]"
                          >
                            {guide.isApproved ? (
                              <>
                                <XCircle className="w-4 h-4 mr-1" /> Unapprove
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" /> Approve
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedGuide(guide)}
                          >
                            <Eye className="w-4 h-4 mr-1" /> View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:bg-red-500/10"
                            onClick={() => handleDeleteGuide(guide._id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {usersLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : users.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No users found
                  </p>
                ) : (
                  users
                    .filter((u: User) => u.role !== "admin")
                    .map((userItem: User) => (
                      <div
                        key={userItem.id}
                        className="border border-border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                            {userItem.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {userItem.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {userItem.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              userItem.role === "guide"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {userItem.role}
                          </span>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(userItem.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Delete User
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <Button
              onClick={() => setSelectedGuide(null)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
            >
              <XCircle className="w-6 h-6" />
            </Button>
            <h2 className="text-2xl font-bold mb-4">
              {selectedGuide.name}'s Details
            </h2>
            <div className="space-y-4">
              <p>
                <strong className="text-muted-foreground">Email:</strong>{" "}
                {selectedGuide.email}
              </p>
              <p>
                <strong className="text-muted-foreground">Mobile:</strong>{" "}
                {selectedGuide.mobile || "N/A"}
              </p>
              <p>
                <strong className="text-muted-foreground">Experience:</strong>{" "}
                {selectedGuide.experience || "N/A"}
              </p>
              <p>
                <strong className="text-muted-foreground">
                  Specializations:
                </strong>{" "}
                {selectedGuide.specializations?.join(", ") || "N/A"}
              </p>
              <div>
                <strong className="text-muted-foreground">Description:</strong>
                <p className="mt-1 text-sm whitespace-pre-wrap">
                  {selectedGuide.description || "N/A"}
                </p>
              </div>
              {selectedGuide.license && (
                <a
                  href={selectedGuide.license}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View License/Certificate
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
