/** 
 * PROFESSIONAL RECEIPT GENERATOR V2.6
 * Fixes: Footer text updated to India, Title bar styling improved to match original thick header.
 */
import jsPDF from "jspdf";
import logo from "@/assets/diagnostics-hub-logo.png";

export interface ReceiptData {
  referenceNumber: string;
  bookingDate: string;
  patientName: string;
  patientEmail?: string;
  patientPhone?: string;
  patientAddress?: string;
  testName: string;
  labName?: string;
  testPrice: number;
  collectionFee: number;
  discount: number;
  sampleCollection: string;
  appointmentDate: string;
  appointmentTime: string;
  individualPrices?: number[];
}

export const generateReceipt = async (data: ReceiptData) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (2 * margin);

  const drawBrandHeader = (doc: jsPDF, y: number) => {
    doc.setTextColor(0, 74, 153);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("DIAGNOSTICS HUB", pageWidth - margin, y + 8, { align: "right" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Trustworthy Pathology Services", pageWidth - margin, y + 13, { align: "right" });
  };

  const drawTableHeader = (doc: jsPDF, y: number) => {
    doc.setFillColor(0, 74, 153);
    doc.rect(margin, y, contentWidth, 11, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("#", margin + 4, y + 7.5);
    doc.text("Test / Package Name", margin + 12, y + 7.5);
    doc.text("Laboratory", margin + 110, y + 7.5);
    doc.text("Price", pageWidth - margin - 4, y + 7.5, { align: "right" });
    return y + 11;
  };

  const drawFooter = (doc: jsPDF) => {
    const footerY = 278;
    doc.setDrawColor(0, 74, 153);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY, pageWidth - margin, footerY);

    // Left side: Support & Email
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 74, 153);
    doc.text("Support: +91 7649885936", margin, footerY + 6);
    
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("Email: support@diagnosticshub.com", margin, footerY + 11.5);

    // Right side: Branding & Tagline
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 74, 153);
    doc.text("Diagnostics Hub Pathology", pageWidth - margin, footerY + 6, { align: "right" });
    
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("Your Health, Our Priority.", pageWidth - margin, footerY + 11.5, { align: "right" });
  };

  // --- PAGE 1 START ---
  // Logo
  try {
    const img = new Image();
    img.src = logo;
    await new Promise((resolve) => { img.onload = resolve; img.onerror = resolve; });
    doc.addImage(img, "PNG", margin, 10, 25, 25);
  } catch (e) {}

  drawBrandHeader(doc, 10);

  // Receipt Title Bar (Restored thick header style)
  doc.setFillColor(245, 247, 250);
  doc.rect(margin, 40, contentWidth, 15, "F");
  
  // Re-adding the Thick Blue Line below title
  doc.setDrawColor(0, 74, 153);
  doc.setLineWidth(0.8);
  doc.line(margin, 40, pageWidth - margin, 40); // Top line
  doc.line(margin, 55, pageWidth - margin, 55); // Bottom line (THIS is what user likely wants)

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("BOOKING RECEIPT", pageWidth / 2, 49.5, { align: "center" });

  let currentY = 66;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text("Reference Number:", margin, currentY);
  doc.setFont("helvetica", "bold"); doc.setTextColor(0, 0, 0);
  doc.text(data.referenceNumber, margin + 35, currentY);
  doc.setFont("helvetica", "normal"); doc.setTextColor(80, 80, 80);
  doc.text("Date:", pageWidth - margin - 45, currentY);
  doc.setFont("helvetica", "bold"); doc.setTextColor(0, 0, 0);
  doc.text(data.bookingDate, pageWidth - margin, currentY, { align: "right" });

  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.2);
  doc.line(margin, currentY + 5, pageWidth - margin, currentY + 5);

  currentY += 12;
  const addressLines = data.patientAddress ? doc.splitTextToSize(data.patientAddress, contentWidth - 60) : ["N/A"];
  const patientCardHeight = 35 + (addressLines.length * 5);
  doc.setFillColor(252, 253, 255); doc.setDrawColor(210, 220, 240);
  doc.roundedRect(margin, currentY, contentWidth, patientCardHeight, 2, 2, "FD");
  doc.setFillColor(240, 246, 255); doc.rect(margin, currentY, contentWidth, 11, "F");
  doc.setFillColor(0, 74, 153); doc.rect(margin, currentY, 3, 11, "F");
  doc.setFontSize(10); doc.setTextColor(0, 74, 153); doc.setFont("helvetica", "bold");
  doc.text("PATIENT INFORMATION PROFILE", margin + 8, currentY + 7.5);

  doc.setFontSize(9.5); doc.setTextColor(60, 60, 60);
  let pY = currentY + 19;
  doc.setFont("helvetica", "bold"); doc.text("Patient Name:", margin + 8, pY);
  doc.setFont("helvetica", "normal"); doc.setTextColor(0, 0, 0); doc.text(data.patientName, margin + 45, pY);
  pY += 6.5;
  doc.setFont("helvetica", "bold"); doc.setTextColor(60, 60, 60); doc.text("Mobile / Email:", margin + 8, pY);
  doc.setFont("helvetica", "normal"); doc.setTextColor(0, 0, 0); doc.text(`${data.patientPhone || 'N/A'} | ${data.patientEmail || 'N/A'}`, margin + 45, pY);
  pY += 6.5;
  doc.setFont("helvetica", "bold"); doc.setTextColor(60, 60, 60); doc.text("Full Address:", margin + 8, pY);
  doc.setFont("helvetica", "normal"); doc.setTextColor(0, 0, 0); doc.text(addressLines, margin + 45, pY);

  currentY += patientCardHeight + 10;

  doc.setFontSize(10.5); doc.setTextColor(0, 74, 153); doc.setFont("helvetica", "bold");
  doc.text("TESTS & LABORATORY SERVICES", margin, currentY);
  currentY += 4;
  currentY = drawTableHeader(doc, currentY);

  const tests = data.testName.split(" | ");
  
  tests.forEach((t, i) => {
    if (currentY > 265) {
      drawFooter(doc);
      doc.addPage();
      drawBrandHeader(doc, 10);
      currentY = 30;
      currentY = drawTableHeader(doc, currentY);
    }

    if (i % 2 === 0) {
      doc.setFillColor(250, 252, 255);
      doc.rect(margin, currentY, contentWidth, 9, "F");
    }
    
    const individualPrice = data.individualPrices && data.individualPrices[i] !== undefined
      ? data.individualPrices[i] : data.testPrice;

    doc.setFontSize(9); doc.setFont("helvetica", "normal"); doc.setTextColor(0, 0, 0);
    doc.text(`${i + 1}`, margin + 4, currentY + 6);
    doc.text(t.trim().substring(0, 60), margin + 12, currentY + 6);
    doc.text((data.labName || "Partner Lab").substring(0, 30), margin + 110, currentY + 6);
    doc.text(`Rs. ${individualPrice.toLocaleString('en-IN')}`, pageWidth - margin - 4, currentY + 6, { align: "right" });
    
    doc.setDrawColor(235, 240, 250); doc.setLineWidth(0.1);
    doc.line(margin, currentY + 9, pageWidth - margin, currentY + 9);
    currentY += 9;
  });

  if (currentY > 210) {
    drawFooter(doc);
    doc.addPage();
    drawBrandHeader(doc, 10);
    currentY = 30;
  }

  currentY += 10;
  const summaryX = pageWidth - margin - 75;
  const amountX = pageWidth - margin;
  doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.setTextColor(80, 80, 80);
  doc.text("Tests Base Price:", summaryX, currentY);
  doc.setFont("helvetica", "bold"); doc.setTextColor(0, 0, 0);
  doc.text(`Rs. ${data.testPrice.toLocaleString('en-IN')}`, amountX, currentY, { align: "right" });

  currentY += 7.5;
  doc.setFont("helvetica", "normal"); doc.setTextColor(80, 80, 80);
  doc.text("Collection Fee:", summaryX, currentY);
  doc.setFont("helvetica", "bold");
  doc.text(`+ Rs. ${data.collectionFee.toLocaleString('en-IN')}`, amountX, currentY, { align: "right" });

  if (data.discount > 0) {
    currentY += 7.5;
    doc.setFont("helvetica", "normal"); doc.setTextColor(80, 80, 80);
    doc.text("Redeemed Discount:", summaryX, currentY);
    doc.setFont("helvetica", "bold"); doc.setTextColor(215, 30, 30);
    doc.text(`- Rs. ${data.discount.toLocaleString('en-IN')}`, amountX, currentY, { align: "right" });
  }

  currentY += 12;
  doc.setFillColor(0, 74, 153);
  doc.roundedRect(summaryX - 5, currentY - 9, 80, 18, 2, 2, "F"); 
  doc.setTextColor(255, 255, 255); doc.setFontSize(11);
  doc.text("TOTAL PAYABLE", summaryX, currentY + 2);
  doc.setFontSize(17); 
  const total = data.testPrice + data.collectionFee - data.discount;
  doc.text(`Rs. ${total.toLocaleString('en-IN')}/-`, amountX - 3, currentY + 2, { align: "right" });

  currentY += 28;
  doc.setDrawColor(200, 220, 200); doc.setFillColor(252, 255, 252);
  doc.roundedRect(margin, currentY, contentWidth, 25, 2, 2, "FD");
  doc.setFillColor(230, 245, 230); doc.rect(margin, currentY, contentWidth, 11, "F");
  doc.setFillColor(30, 90, 30); doc.rect(margin, currentY, 3, 11, "F");
  doc.setFontSize(10.5); doc.setTextColor(30, 90, 30); doc.setFont("helvetica", "bold");
  doc.text("CONFIRMED COLLECTION SCHEDULE", margin + 8, currentY + 7.5);
  doc.setFontSize(10); doc.setTextColor(60, 60, 60); doc.setFont("helvetica", "normal");
  doc.text("Collection Date:", margin + 8, currentY + 18);
  doc.setFont("helvetica", "bold"); doc.setTextColor(0, 0, 0);
  doc.text(data.appointmentDate, margin + 48, currentY + 18);
  doc.setFont("helvetica", "normal"); doc.setTextColor(60, 60, 60);
  doc.text("Time Window:", pageWidth / 2 + 10, currentY + 18);
  doc.setFont("helvetica", "bold"); doc.setTextColor(0, 0, 0);
  doc.text(data.appointmentTime, pageWidth - margin - 8, currentY + 18, { align: "right" });

  drawFooter(doc);
  doc.save(`Receipt_${data.referenceNumber}.pdf`);
};
