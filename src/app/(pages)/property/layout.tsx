import React from 'react';

export default function PropertyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[rgb(255, 253, 246)]">
            {children}
        </div>
    );
}