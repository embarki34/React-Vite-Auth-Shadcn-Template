'use client';

import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";
import { getStates as fetchStates } from "@/const/services/getStates";
import { Stats } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [states, setStates] = useState<Stats["data"] | null>(null);
    const [refresh, setRefresh] = useState(false);
    const [timeFilter, setTimeFilter] = useState<"all" | "last7days" | "last30days">("all");

    useEffect(() => {
        const getStates = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchStates();
                setStates(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        getStates();
    }, [refresh]);

    const {
        workerDistributionByDepartment,
        workerByActiveStatus,
        totalWorkers,
        activeWorkers,
        inactiveWorkers,
        totalFeedback,
        engagementRate,
        topPerformingWorker,
        mostDislikedWorker,
        feedbackThisMonth,
        newWorkersThisMonth,
        engagementHistory,
    } = states || {};

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const filteredEngagementHistory = engagementHistory?.filter((entry) => {
        const entryDate = new Date(entry.created_at);
        const now = new Date();

        if (timeFilter === "last7days") {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);
            return entryDate >= sevenDaysAgo;
        }

        if (timeFilter === "last30days") {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(now.getDate() - 30);
            return entryDate >= thirtyDaysAgo;
        }

        return true; // "all"
    });

    const likesData = filteredEngagementHistory?.map((entry) => ({
        time: new Date(entry.created_at).toLocaleDateString(),
        likes: entry.is_liked ? entry._count : 0,
        dislikes: !entry.is_liked ? entry._count : 0,
    }));

    return (
        <div className="p-6 space-y-6  min-h-screen">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
                <Button onClick={() => setRefresh(!refresh)} variant="outline">Refresh</Button>
            </header>

            {error && (
                <Card>
                    <CardContent>
                        <p className="text-red-600 font-medium">Error: {error.message}</p>
                    </CardContent>
                </Card>
            )}

            {!loading && !error && states && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    <Card>
                        <CardHeader>
                            <CardTitle>Feedback</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Total Feedback: {totalFeedback}</p>
                            <p>Feedback This Month: {feedbackThisMonth}</p>
                            <p>Engagement Rate: {engagementRate}%</p>
                            <Progress value={engagementRate} className="w-full mt-2" />
                        </CardContent>
                    </Card>

                    {/* Performance Highlights */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Highlights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p><strong>Top Performing Worker:</strong> {topPerformingWorker ? `${topPerformingWorker.fullname} (${topPerformingWorker.department})` : "N/A"}</p>
                            <p><strong>Most Disliked Worker:</strong> {mostDislikedWorker ? `${mostDislikedWorker.fullname} (${mostDislikedWorker.department})` : "N/A"}</p>
                        </CardContent>
                    </Card>

                    {/* New Workers */}
                    <Card>
                        <CardHeader>
                            <CardTitle>New Workers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-blue-600">{newWorkersThisMonth}</p>
                            <p>New workers this month</p>
                        </CardContent>
                    </Card>

                    {/* Worker Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Worker Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={workerDistributionByDepartment}
                                        dataKey="_count"
                                        nameKey="department"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {workerDistributionByDepartment?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Worker Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Worker Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={workerByActiveStatus}
                                        dataKey="_count"
                                        nameKey="active"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {workerByActiveStatus?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.active ? '#00C49F' : '#FF8042'} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend formatter={(value) => (value === 'true' ? 'Active' : 'Inactive')} />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Worker Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Worker Statistics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart
                                    data={[
                                        { name: 'Total', value: totalWorkers },
                                        { name: 'Active', value: activeWorkers },
                                        { name: 'Inactive', value: inactiveWorkers },
                                    ]}
                                >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Feedback */}


                    {/* Engagement History */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Engagement History</CardTitle>
                            <div className="flex space-x-2 mt-2">
                                <Button onClick={() => setTimeFilter("all")} variant={timeFilter === "all" ? "outline" : "default"}>
                                    All Time
                                </Button>
                                <Button onClick={() => setTimeFilter("last7days")} variant={timeFilter === "last7days" ? "outline" : "default"}>
                                    Last 7 Days
                                </Button>
                                <Button onClick={() => setTimeFilter("last30days")} variant={timeFilter === "last30days" ? "outline" : "default"}>
                                    Last 30 Days
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={likesData}>
                                    <XAxis dataKey="time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="likes" stroke="#00C49F" name="Likes" />
                                    <Line type="monotone" dataKey="dislikes" stroke="#FF8042" name="Dislikes" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
