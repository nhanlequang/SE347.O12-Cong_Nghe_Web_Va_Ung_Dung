import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind';
import { BsArrowRight } from "react-icons/bs";
import { useState } from 'react';
import { VoucherIcon, LocationIcon, AccountIcon, OrderIcon, RatingIcon, QuestionIcon, LogOutIcon } from '~/assets/icons';
const cx = classNames.bind(styles);
function Sidebar() {
    const [activeItem , setActiveItem ] = useState(null)
    const handleClickItem = (item) =>{
        setActiveItem(item)
    }
    return (
        <div className={cx('main__sideBar')}>
            <Link to={'/user-profile/info'}>
                <div className={cx('tab_container')}>
                    <div className={cx('tab_container_info')}>
                        <img src={AccountIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Thông tin tài khoản</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            <Link to={'/user-profile/orders'}>
                <div className={cx('tab_container')}>
                    <div className={cx('tab_container_info')}>
                        <img src={OrderIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Lịch sử đơn hàng</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            <Link to={'/user-profile/vouchers'}>
                <div className={cx('tab_container')}>
                    <div className={cx('tab_container_info')}>
                        <img src={VoucherIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Ví voucher</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            
            <Link to={'/user-profile/addresses'}>
                <div className={cx('tab_container')}>
                    <div className={cx('tab_container_info')}>
                        <img src={LocationIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Sổ địa chỉ</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            <Link to={'/user-profile/reviews'}>
                <div className={cx('tab_container')}>
                    <div className={cx('tab_container_info')}>
                        <img src={RatingIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Đánh giá và phản hồi</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            <Link to={'/user-profile/policies'}>
                <div className={cx('tab_container')}>
                    <div className={cx('tab_container_info')}>
                        <img src={QuestionIcon} className={cx('tab_icon')}></img>
                        <span className={cx('tab_info')}>Chính sách và câu hỏi thường gặp</span>
                    </div>
                    <BsArrowRight className={cx('tab_arrowRight')}/>
                </div>
            </Link>
            <div className={cx('tab_container')}>
                <div className={cx('tab_container_info')}>
                    <img src={LogOutIcon} className={cx('tab_icon')}></img>
                    <span className={cx('tab_info')}>Đăng xuất</span>
                </div>
                <BsArrowRight className={cx('tab_arrowRight')}/>
            </div>
        </div>
    );
}

export default Sidebar;