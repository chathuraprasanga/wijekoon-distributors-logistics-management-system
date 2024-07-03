import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Base64 encoded image string
import companyLogoBase64 from '../../../../resources/images/logo1.png';
import paid from '../../../../resources/images/paid.png';
import unpaid from '../../../../resources/images/unpaid.png';

export const generateInvoicePDF = async (data: any) => {
  const doc = new jsPDF();

  // Company logo and name
  const logoWidth = 50; // Width of the logo in the PDF
  const logoHeight = 50; // Maintain aspect ratio

  // Add company logo and name
  doc.addImage(companyLogoBase64, 'PNG', 140, 10, logoWidth, logoHeight);
  doc.setFontSize(8);
  doc.text('BOI Junction, Mawathagama', 14, doc.internal.pageSize.height - 22);
  doc.text('wijekoondistributor@gmail.com', 14, doc.internal.pageSize.height - 18);
  doc.text('077 - 41 39 758', 14, doc.internal.pageSize.height - 14);
  doc.text('This Invoice is system Generated Invoice', 14, doc.internal.pageSize.height - 10);

  // Add title
  doc.setFontSize(24);
  doc.text('Invoice', 14, 22);

  // Add order ID
  doc.setFontSize(12);
  doc.text(`Order ID: ${data.orderId}`, 14, 30);

  // Add customer details
  const customer = data.customerOrderRequest.customer;
  doc.text(`Customer Name: ${customer.fullName}`, 14, 38);
  doc.text(`Email: ${customer.email}`, 14, 46);
  doc.text(`Phone: ${customer.phone}`, 14, 54);
  doc.text(`Address: ${customer.address}`, 14, 62);

  // Add order details
  const order = data.customerOrderRequest.order;

  const orderItems = order.map((item: any) => [
    item.product.code,
    item.product.name,
    item.quantity,
    item.product.sellingPrice,
    item.lineDiscount + '%',
    item.lineTax + '%',
    item.lineTotal,
  ]);

  doc.autoTable({
    startY: 72,
    head: [
      ['Product Code', 'Product Name', 'Quantity', 'Unit Price', 'Discount', 'Tax', 'Total Price'],
    ],
    body: orderItems,
  });

  const finalY = (doc as any).lastAutoTable.finalY; // Note: TypeScript may complain without "as any"

  // Add totals
  doc.text(`Net Total: ${data.netTotal}`, 14, finalY + 20);

  // Add status

  doc.text(`${data.status}`, 14, finalY + 30);

  // Save the PDF
  doc.save(`invoice-${data.orderId}.pdf`);
};
