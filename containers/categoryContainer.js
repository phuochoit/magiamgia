//react redux
import { connect } from 'react-redux';

//componet
import CategoryComponent from "../components/category/categoryComponent";

// action
import { FetchCategoryAction } from "../actions/actionCategory";
import { fetchNetConnected } from "../actions/actionConnected";

const mapStateToProps = (state) => {
    return {
        category: state.category,
        isConnected: state.isConnected.isConnected,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onfetchNetConnected: () => {
            dispatch(fetchNetConnected())
        },
        _onFetchCategory: () => {
            dispatch(FetchCategoryAction())
        }
    }
};
const CategoryContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
export default CategoryContainer;