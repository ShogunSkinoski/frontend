'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from './components/common/header';
import { Building2, BarChart3, MessageSquare, Eye } from 'lucide-react';

export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[rgb(255, 253, 246)]">
            <Header />
            
            <main className="pt-24">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">
                            Welcome to The Flex
                        </h1>
                        <p className="text-xl text-[#5C5C5A] mb-8 max-w-2xl mx-auto">
                            Manage your vacation rental properties with ease. View properties, track reviews, and monitor performance all in one place.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button 
                                onClick={() => router.push('/property')}
                                className="bg-[#284E4C] hover:bg-[#284E4C]/90 text-white px-8 py-3 text-lg"
                            >
                                <Building2 className="h-5 w-5 mr-2" />
                                View Properties
                            </Button>
                            <Button 
                                onClick={() => router.push('/dashboard')}
                                variant="outline"
                                className="border-[#284E4C] text-[#284E4C] hover:bg-[#284E4C]/5 px-8 py-3 text-lg"
                            >
                                <BarChart3 className="h-5 w-5 mr-2" />
                                Dashboard
                            </Button>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-[#284E4C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="h-8 w-8 text-[#284E4C]" />
                                </div>
                                <CardTitle className="text-xl font-semibold text-[#333333]">
                                    Property Management
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-[#5C5C5A] mb-4">
                                    View and manage all your vacation rental properties in one centralized location.
                                </p>
                                <Button 
                                    onClick={() => router.push('/properties')}
                                    variant="outline"
                                    className="w-full border-[#284E4C] text-[#284E4C] hover:bg-[#284E4C]/5"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Properties
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-[#284E4C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="h-8 w-8 text-[#284E4C]" />
                                </div>
                                <CardTitle className="text-xl font-semibold text-[#333333]">
                                    Review Management
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-[#5C5C5A] mb-4">
                                    Monitor and manage guest reviews across all booking platforms.
                                </p>
                                <Button 
                                    onClick={() => router.push('/dashboard')}
                                    variant="outline"
                                    className="w-full border-[#284E4C] text-[#284E4C] hover:bg-[#284E4C]/5"
                                >
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Manage Reviews
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-[#284E4C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BarChart3 className="h-8 w-8 text-[#284E4C]" />
                                </div>
                                <CardTitle className="text-xl font-semibold text-[#333333]">
                                    Analytics & Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-[#5C5C5A] mb-4">
                                    Track performance metrics and gain insights into your property portfolio.
                                </p>
                                <Button 
                                    onClick={() => router.push('/dashboard')}
                                    variant="outline"
                                    className="w-full border-[#284E4C] text-[#284E4C] hover:bg-[#284E4C]/5"
                                >
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    View Analytics
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}