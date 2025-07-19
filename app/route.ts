import { NextRequest, NextResponse } from 'next/server';
import { findMatchingMentorsByStudentId } from '@/lib/matchingService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'StudentProfile.id is required as query parameter' 
        },
        { status: 400 }
      );
    }

    const mentors = await findMatchingMentorsByStudentId(studentId);

    return NextResponse.json({
      success: true,
      mentors,
      count: mentors.length,
    });

  } catch (error) {
    console.error('Error in mentor matching API:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to find matching mentors',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
