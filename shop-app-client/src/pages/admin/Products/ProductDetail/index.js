import classNames from "classnames/bind";
import { AiOutlineSearch, AiFillCaretDown, AiOutlinePlus } from "react-icons/ai";
import { FaFileImport, FaFileExport } from "react-icons/fa";
import { IoSquareOutline, IoCheckboxSharp } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { AiOutlineEdit } from "react-icons/ai";
import { MdPublish } from "react-icons/md";
import { BiImport, BiSolidLockAlt } from "react-icons/bi";
import { useContext } from "react";
import { PiWarehouseFill } from "react-icons/pi";
import { ModalContext } from "..";
import {  useDispatch, useSelector } from "react-redux";
import { setCurrentProduct } from "~/redux/Product/action";
import ColorSize from "../ColorSize";

import { useState } from "react";


import styles from './ProductDetail.module.scss'
import { useRef } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)

function ProductDetail({index}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {setShowModal, setTypeModal} = useContext(ModalContext);
    const product = useSelector(state => state.productReducer.listProductsState[index])
    const listImage = product.colors.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.images)
    }, [])
    const imageProductDefault = 'https://cdn-app.kiotviet.vn/retailler/Content/img/default-product.png';
    const [indexImageActive, setIndexImageActive] = useState(0);
    const handleClickImage = (src, index) => {
        setIndexImageActive(index)
    }
    const quantityStorage = product.colors.reduce((accumulator, currentValue) => {
        const quantityColor = currentValue.sizes.reduce((acc,curr) => {
            return acc + curr.quantity
        },0)
        return accumulator + quantityColor;
    },0)
    const listStorage = product.colors.reduce((accumulator, currentValue) => {
        const list = currentValue.sizes.reduce((acc,curr) => {
            return acc.concat({
                color: currentValue.colorName,
                size: curr.sizeName,
                quantity: curr.quantity
            })
        },[])
        return accumulator.concat(list);
    },[])
    const descriptionElement = useRef();
    useEffect(() => {
        
        if (descriptionElement) {
            descriptionElement.current.innerHTML = product.description;
        }
    },[product])
    return (
        <div className={cx('wrapper')}>
            {/* Header */}
            <div className={cx('header')}>
                <div className={cx('tabpanel')}>Thông tin</div>
            </div>

            {/* Body */}
            <div className={cx('product-container')}>
                <div className={cx('product-name')}>{product.productName}</div>
                <div className={cx('product-status')}>
                {
                    product.status === 'Chưa đăng bán' &&
                    <span><PiWarehouseFill color="red" style={{ fontSize: '16px', marginBottom: '2px', marginRight: '4px' }} />{product.status}</span>
         
                }
                {
                    product.status === 'Bán trực tiếp' &&
                    <span><BsCheckLg color="green" style={{ fontSize: '16px', marginBottom: '2px', marginRight: '4px' }} />{product.status}</span>
         
                }
                {
                    product.status === 'Ngừng kinh doanh' &&
                    <span><FcCancel  style={{ fontSize: '16px', marginBottom: '2px', marginRight: '4px' }} />{product.status}</span>
         
                }
                
                    
                </div>
                <div className={cx('product-detail')}>
                    {/* Ảnh */}
                 <div className={cx('container-img')}>
                 <div className={cx('product-img')}>
                        {/* Ảnh đại di */}
                        <div className={cx('container-avt')}><img src={listImage[indexImageActive] || imageProductDefault} className={cx('product-avt')} /></div>
                        {/* List ảnh */}
                        <div  className={cx('container-product-list-img')}>
                            <ul className={cx('product-list-img')}>


                                {
                                    listImage.length > 0 ? listImage.map((item, index) => {
                                        return (
                                            <li key={index} onClick={() => handleClickImage(item, index)} className={cx('product-item-img', {
                                                active: index === indexImageActive
                                            })}>
                                                <img src={item} />
                                            </li>
                                        )
                                    }) : <li className={cx('product-item-img', 'active')}>
                                        <img src={imageProductDefault} />
                                    </li>

                                }


                            </ul>
                        </div>
                    </div>
                 </div>


                    {/* info */}
                    <div className={cx('product-info')}>
                        {/* Form group */}
                        <div className={cx('form-group')}>
                            <label>Mã hàng: </label>
                            <div className={cx('info-value')}><strong>{product.productCode}</strong></div>
                        </div>

                        <div className={cx('form-group')}>
                            <label>Nhóm hàng: </label>
                            <div className={cx('info-value')}>{product.productCategory}</div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Loại hàng:</label>
                            <div className={cx('info-value')}>{product.productType}</div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Giá bán:</label>
                            <div className={cx('info-value')}>{product.exportPrice}</div>
                        </div>
                        <div className={cx('form-group')}>
                            <label>Giá vốn:</label>
                            <div className={cx('info-value')}>{product.importPrice}</div>
                        </div>
                        <div className={cx('form-group-description')}>
                            <div><label>Mô tả:</label></div>
                            <div ref={descriptionElement} className={cx('description')}>
                               
                            </div>
                            
                        </div>


                    </div>

                    {/* Bảng màu/size */}
                    <div className={cx('product-cz')}>
                        {/* Form group */}
                        <div className={cx('form-group-color-size')}>
                            <div><label>Tồn kho:</label> <span><strong>{quantityStorage}</strong></span></div>
                            <div style={{ marginTop: '10px' }}>
                                <ColorSize list={listStorage} />
                            </div>
                        </div>


                    </div>
                </div>

                {/* Chức năng */}
                <div className={cx('product-fucntion')}>
                    <span className={cx('btn', 'btn-succeed')} onClick={() => { dispatch(setCurrentProduct(product)) ; setTypeModal('update'); setShowModal(true)}}><AiOutlineEdit style={{ marginRight: '6px', fontSize: '16px' }} />   Cập nhật </span>
                    <a onClick={() => navigate('/admin/products/import', {
                        state: product
                    })} className={cx('btn', 'btn-succeed')}><BiImport style={{ marginRight: '6px', fontSize: '18px' }} />   Nhập hàng </a>
                    <span className={cx('btn', 'btn-error')}><BiSolidLockAlt style={{ marginRight: '6px', fontSize: '16px' }} />   Ngừng kinh doanh</span>
                    <span className={cx('btn', 'btn-succeed')}><MdPublish style={{ marginRight: '6px', fontSize: '16px' }} />   Đăng bán</span>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;