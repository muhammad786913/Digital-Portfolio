import { NextResponse } from 'next/server';
import { stats, projects } from '@/lib/data';
import { localStore } from '@/lib/mongodb';

export async function GET() {
  const dynamicMetrics = {
    overview: stats,
    totalProjects: projects.length,
    activeClientInquiries: localStore.contacts.length,
    technologiesCovered: 16,
    codebaseStats: {
      totalCommits: 340,
      linesOfCode: "48,500+",
      averageResponseTimeMs: 18,
      databaseHealth: "100% Operational"
    },
    systemTime: new Date().toISOString()
  };

  return NextResponse.json({
    success: true,
    data: dynamicMetrics
  });
}
