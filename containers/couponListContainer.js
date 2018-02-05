//react redux
import { connect } from 'react-redux';

//componet
import CouponListComponent from "../components/coupon/couponListComponent";

// action
import { FetchCouponListAction, FetchCouponTabListAction, FetchTabCouponListAction} from "../actions/actionCouponList";
import { fetchNetConnected } from "../actions/actionConnected";

const mapStateToProps = (state) => {
    return {
        couponList: state.couponList,
        isConnected: state.isConnected.isConnected,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        _onFetchCouponList: (merchant) => {
            dispatch(FetchCouponListAction(merchant))
        },
        _onFetchCouponListTab: (action) => {
            dispatch(FetchTabCouponListAction(action))
        },
        _onFetchTabCouponList: (action) => {
            dispatch(FetchCouponTabListAction(action))
        },
        onfetchNetConnected: () => {
            dispatch(fetchNetConnected())
        },
    }
};
const CouponListContainer = connect(mapStateToProps, mapDispatchToProps)(CouponListComponent);
export default CouponListContainer;