import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';

const SidebarPortal = () => {
    return ReactDOM.createPortal(
        <Sidebar />,
        document.getElementById('sidebar') // Assuming you have a div with id 'sidebar' in your index.html
    );
}

export default SidebarPortal;
