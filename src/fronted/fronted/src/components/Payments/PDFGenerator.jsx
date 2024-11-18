import jsPDF from 'jspdf';
import React from 'react';

const PDFGenerator = ({ selectedInvoice, recipientName, senderName }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Encabezado
        doc.setFillColor(0, 0, 0); // Color negro
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, 'F'); // Franja negra arriba
        doc.setFontSize(18);
        doc.setTextColor(255, 255, 255); // Color blanco
        doc.text(`Factura de la tarea ${selectedInvoice ? selectedInvoice.name : 'No disponible'}`, 20, 20); // Texto del encabezado

        // Contenido del PDF
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Texto negro

        // Información del destinatario y emisor
        doc.text(`Destinatario del Pago: ${recipientName || 'Nombre no disponible'}`, 20, 50);
        doc.text(`Emisor del Pago: ${senderName || 'Nombre no disponible'}`, 20, 60);
        doc.text(`Factura: ${selectedInvoice ? selectedInvoice.name : 'No disponible'}`, 20, 80);
        doc.text(`Monto: ${selectedInvoice ? `$${selectedInvoice.price}` : '$0.00'}`, 20, 100);
        doc.text(`Estado: ${selectedInvoice ? selectedInvoice.status : 'No disponible'}`, 20, 110); 

        // Resumen de la factura
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Texto negro para el resumen
        doc.text('Resumen de la Factura', 20, 130);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Total: ${selectedInvoice ? `$${selectedInvoice.amount}` : '$0.00'}`, 20, 145); // Muestra el total

        // Pie de página
        doc.setFillColor(0, 0, 0); // Color negro
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.rect(0, pageHeight - 30, doc.internal.pageSize.getWidth(), 30, 'F'); // Franja negra abajo
        doc.setTextColor(255, 255, 255); // Color blanco
        doc.text('Página 1', 20, pageHeight - 20); // Texto del pie de página

        doc.save(`${selectedInvoice ? selectedInvoice.name : 'factura_sin_seleccionar'}_factura.pdf`);
    };

    return (
        <button 
            onClick={generatePDF} 
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
            Descargar PDF
        </button>
    );
};

export default PDFGenerator;
