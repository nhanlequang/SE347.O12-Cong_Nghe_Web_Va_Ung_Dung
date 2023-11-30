import { RiCoupon3Fill } from "react-icons/ri";
import Footer from "./Footer";
import Header from "./Header";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import { useSelector } from "react-redux";

function LayoutNoSidebar({ children }) {
    const [openGridVoucher, setOpenGridVoucher] = useState(false);
    const [voucherList, setVoucherList] = useState([])

    const handleClose = (e) => {
        if (e.target.id === 'xsngxWrapperOverlayVoucherOpen') setOpenGridVoucher(false)
    }
    const getAllVouchers = async () => {
        try {
            const config = {}
            const { data } = await axios.get(`${baseUrl}/api/vouchers`, config)
            console.log(data)
            setVoucherList([...data.result])
        } catch (error) {
            console.log(error)
        }
    }
    const checkStatus = (item) => {
        if (item.quanlity <= 0) return false;
        const expirationDate = new Date(item.expiredDate);

        // Lấy ngày hôm nay
        const today = new Date();
        if (today > expirationDate) return false;
        return true;
    }
    const {login} = useSelector(store => store.auth)
    useEffect(() => {
        getAllVouchers()
    }, [])
    return (
        <>
            <Header />
            <div style={{ paddingTop: '30px' }}>{children}</div>
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: openGridVoucher ? 14 : 11, transition: 'all 0.3s', transform: openGridVoucher ? 'translatey(0)' : 'translatey(100%)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#2f5acf', color: 'white', width: '100%', maxWidth: '563px', padding: '0 1.5rem', height: '50px', fontSize: '16px', borderRadius: '0.5rem 0.5rem 0 0', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.1em' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <RiCoupon3Fill size={18} style={{ marginRight: '12px' }} />
                        VOUCHER DÀNH CHO BẠN
                    </div>
                    {
                        openGridVoucher
                            ? <FaArrowDown style={{ cursor: 'pointer' }} onClick={() => setOpenGridVoucher(false)} />
                            : <FaArrowUp style={{ cursor: 'pointer' }} onClick={() => setOpenGridVoucher(true)} />
                    }
                </div>
                <div style={{ padding: '2.5rem', backgroundColor: 'white' }}>
                    <div style={{ display: 'flex', gap: '3rem',  boxSizing: 'border-box', userSelect: 'none', WebkitOverflowScrolling: 'touch', overflowX: 'scroll', whiteSpace: 'nowrap', width: '100%' }}>
                        {(voucherList.filter(item => checkStatus(item))).slice(0,4).map((item, index) =>
                            <div key={index} style={{ width: '380px', height: '210px', borderRadius: '12px', position: 'relative', backgroundColor: '#ccc', padding: '2rem' }}>
                                <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'black', marginTop: '50px', zIndex:'10' }}>Giảm {item.voucherPrice}{item.isPercent ? '%' :'K' }</div>
                                <div style={{zIndex:'10'}}>Cho đơn hàng từ {item.minPrice}K</div>
                                <div style={{ borderTop: '1px solid #efefef', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', zIndex:'10' }}>
                                    <div style={{zIndex:'10'}}>{item.voucherCode}</div>
                                    <button onClick={()=>{console.log(login)}} style={{ border: 'none', backgroundColor: 'white', borderRadius: '20px', padding: '4px 14px', cursor:'pointer', zIndex:'10' }}>Lưu mã</button>
                                </div>
                                {/* <img src={item.voucherImage} style={{width:'380px', height:'210px', position:'absolute', opacity:'0.5', top:0, left:0, borderRadius:'12px', zIndex:'3'}}/> */}
                            </div>)}

                    </div>
                </div>
            </div >
            <div id="xsngxWrapperOverlayVoucherOpen" onClick={handleClose} style={{ opacity: openGridVoucher ? 1 : 0, visibility: openGridVoucher ? 'visible' : 'hidden', pointerEvents: openGridVoucher ? 'visible' : 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#0006', transition: 'all .3s', zIndex: openGridVoucher ? 13 : 10 }}></div>
            <Footer />
        </>
    );
}

export default LayoutNoSidebar;