import classNames from "classnames/bind";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineSearch, AiFillCaretDown, AiOutlinePlus } from "react-icons/ai";
import { IoArrowBack } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";


import { RiDeleteBin6Line } from "react-icons/ri";


import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";



import styles from './ImportProducts.module.scss'
import DropDownImport from "./DropDownImport";
import ImportProductRow from "./ImportProductRow";
import Modal from "./Modal";

const cx = classNames.bind(styles)

function ImportProducts() {

    const [inputFocus, setInputFocus] = useState(false);
    const [openModelImport, setOpenModalImport] = useState(false)
    const [product, setProduct] = useState(null);
    const [showContract, setShowContract] = useState(true)
    const [isClickFromDropDown, setClickFromDropDown] = useState(false);
    const inputElement = useRef(null);
    const dropElement = useRef(null);

    const listSearchProducts = [
        {
            productName: 'Áo vest nữ màu hồng chìm',
            productId: 'NU001',
            exportPrice: 870000,
            quantity: 170,
            productImage: 'https://cdn-app.kiotviet.vn/sample/fashion/25.png'
        },
        {
            productName: 'Áo vest nữ màu hồng chìm',
            productId: 'NU001',
            exportPrice: 870000,
            quantity: 170,
            productImage: 'https://cdn-app.kiotviet.vn/sample/fashion/25.png'
        },
        {
            productName: 'Áo vest nữ màu hồng chìm',
            productId: 'NU001',
            exportPrice: 870000,
            quantity: 170,
            productImage: 'https://cdn-app.kiotviet.vn/sample/fashion/25.png'
        },
        {
            productName: 'Áo vest nữ màu hồng chìm',
            productId: 'NU001',
            exportPrice: 870000,
            quantity: 170,
            productImage: 'https://cdn-app.kiotviet.vn/sample/fashion/25.png'
        },
        {
            productName: 'Áo vest nữ màu hồng chìm',
            productId: 'NU001',
            exportPrice: 870000,
            quantity: 170,
            productImage: 'https://cdn-app.kiotviet.vn/sample/fashion/25.png'
        }
    ]
    // const listTableProducts = [
    //     {
    //         productId: 'CM015',
    //         productName: 'Áo vest nữ màu hồng nổi 015'
    //     },
    //     {
    //         productId: 'CM016',
    //         productName: 'Áo vest nữ màu hồng nổi 016'
    //     },
    //     {
    //         productId: 'CM017',
    //         productName: 'Áo vest nữ màu hồng nổi 017'
    //     },
    //     {
    //         productId: 'CM018',
    //         productName: 'Áo vest nữ màu hồng nổi 018'
    //     },
    //     {
    //         productId: 'CM019',
    //         productName: 'Áo vest nữ màu hồng nổi 019'
    //     }
    // ]
    const [listImportProducts, setListImportProducts] = useState([])
    const handleClickItemSearch = (item) => {
        inputElement.current.focus();
        setListImportProducts(prev => [...prev, item])
        setInputFocus(prev => !prev);

    }
    const handleRemoveItem = (index) => {
        setListImportProducts(prev => {
            const nextState = [...prev];
            nextState.splice(index, 1);
            return nextState;
        })
    }

    useEffect(() => {
        console.log(listImportProducts)
    }, [listImportProducts])

    // useEffect(() => {
    //     const handleOutsideClick = (e) => {
    //         if (!inputElement.current?.contains(e.target)) {
    //             setInputFocus(false)
    //         }
    //     };

    //     const timeoutId = setTimeout(() => {
    //         document.addEventListener("click", handleOutsideClick, false);
    //     }, 0);
    //     return () => {
    //         clearTimeout(timeoutId);
    //         document.removeEventListener("click", handleOutsideClick, false);
    //     };
    // });
    return (
        <div className={cx('wrapper')}>
            <div style={{ flex: '1' }}>
                <div className={cx('toolbox')}>

                    <div className={cx('title-import')}>
                        <Link to="/admin/products" className={cx('icon')}><IoArrowBack /></Link>
                        <span>  Nhập hàng</span>
                    </div>
                    {/* Filter */}
                    <div className={cx('filter-box')}>
                        <div className={cx('search-box', {
                            'input-focus': inputFocus
                        })}>
                            <AiOutlineSearch className={cx('icon')} />
                            <input onClick={() => setInputFocus(true)} ref={inputElement} type="text" placeholder="Theo mã, tên hàng" className={cx('search-input')} />
                            <AiFillCaretDown className={cx('icon')} />
                        </div>
                        {inputFocus &&
                            <div ref={dropElement}>
                                <DropDownImport items={listSearchProducts} onClick={handleClickItemSearch} />
                            </div>
                        }
                    </div>

                    <div  onClick={() => setShowContract(false)} style={{marginLeft: '32px'}} >
                        
                        <span className={cx('btn','btn-succeed')}>Xác nhận nhập hàng</span>
                    </div>

                </div>

                <div className={cx('tableView')}>
                    <table className={cx('table')}>
                        <thead className={cx('thead')}>
                            <tr>
                                <th className={cx('delete')}></th>
                                <th className={cx('stt')}>STT</th>
                                <th className={cx('code')}>Mã hàng</th>
                                <th className={cx('name')}>Tên hàng</th>
                                <th className={cx('quantity')}>Số lượng</th>
                                <th className={cx('unitPrice')}>Đơn giá</th>
                                <th className={cx('price')}>Thành tiền</th>
                                <th className={cx('import')}></th>
                            </tr>
                        </thead>
                        <tbody>

                            {listImportProducts.map((item, index) => {
                                return (
                                    <ImportProductRow key={index} index={index} setModal={setOpenModalImport} setProduct={setProduct} product={item} onClickRemoveItem={handleRemoveItem} />
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                {openModelImport && <Modal setModal={setOpenModalImport} product={product} />}
            </div>
            <div className={cx('import-contract', { hide: showContract })}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className={cx('button-right')} onClick={() => setShowContract(prev => !prev)}>
                        <FaAngleRight className={cx('icon-right')} />
                    </div>

                    <div>
                        <span className={cx('time')} style={{ marginRight: '4px' }}>25/10/2023</span>
                        <span className={cx('time')}>10:15</span>
                    </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                    <div className={cx('form-group')} >
                        <label>Mã phiếu nhập</label>
                        <input type="text" style={{ width: '140px', background: 'transparent' }} value={'Mã phiếu tự động'} disabled />
                    </div>

                    <div className={cx('form-group')}>
                        <label>Trạng thái</label>
                        <span className={cx('text')}>Chờ xác nhận</span>
                    </div>

                    <div className={cx('form-group')}>
                        <label>Tổng tiền hàng</label>
                        <span className={cx('text')} style={{ textAlign: 'right' }}>3,720,000</span>
                    </div>

                    <div className={cx('form-group')}>
                        <label>Giảm giá</label>
                        <div style={{ width: '140px', display: 'inline-block' }}>
                            <input className={cx('text')} type="text" style={{ width: '100px', background: 'transparent', textAlign: 'right', marginRight: '8px' }} />
                            <span>VNĐ</span>
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <label>Thành tiền</label>
                        <span className={cx('text')} style={{ textAlign: 'right', fontWeight: 'bold' }}>3,720,000 VNĐ</span>
                    </div>

                    <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
                        <span className={cx('btn', 'btn-succeed')} style={{ fontSize: '16px', padding: '10px 24px' }}>Hoàn tất <BsCheckLg style={{ marginLeft: '4px', fontSize: '20px' }} /></span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ImportProducts;