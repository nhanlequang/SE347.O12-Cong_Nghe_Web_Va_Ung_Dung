import Footer from "./Footer";
import Header from "./Header";

function LayoutNoSidebar({children}) {
    return ( 
        <>
            <Header/>
            <div style={{paddingTop:'68px'}}>{children}</div>
            <Footer/>
        </>
        );
}

export default LayoutNoSidebar;