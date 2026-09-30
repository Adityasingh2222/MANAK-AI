import { NextRequest, NextResponse } from 'next/server';
import { documentsStoreData } from '@/lib/mockData';

export async function POST(
  req: NextRequest,
  { params }: { params: { docId: string } }
) {
  const docId = params.docId;
  const doc = documentsStoreData.find(d => d.id === docId);

  if (doc) {
    doc.status = 'indexed';
    doc.approved_by = 'Admin_Manual_Approval';
  }

  return NextResponse.json({
    status: 'success',
    message: `Document ${docId} approved and indexed into MANAK-AI RAG knowledge base.`
  });
}
