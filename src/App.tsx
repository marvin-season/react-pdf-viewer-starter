
import PDFViewer  from "./components/PDFViewer.jsx";
const workerUrl = "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js";


const App = () => {

    return (
        <PDFViewer workerUrl={workerUrl} fileUrl="/document2.pdf" onDocumentLoad={() => {
            console.log('onDocumentLoad');
        }}/>
    );
};

export default App;
