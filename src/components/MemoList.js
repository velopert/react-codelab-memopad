import React from 'react';
import { Memo } from 'components';

class MemoList extends React.Component {
    
    render() {
        const mapToComponents = data => {
            return data.map((memo, i) => {
                return (<Memo 
                            data={memo}
                            ownership={ (memo.writer === this.props.currentUser) }
                            key={memo._id}
                            index={i}
                            onEdit={this.props.onEdit}
                            editStatus={this.props.editStatus}
                            onRemove={this.props.onRemove}
                            onRemoveData={this.props.onRemoveData}
                            removeStatus={this.props.removeStatus}
                />);
            });
        };
        
        return (
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

MemoList.propTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string,
    onEdit: React.PropTypes.func,
    editStatus: React.PropTypes.object,
    onRemove: React.PropTypes.func,
    onRemoveData: React.PropTypes.func,
    removeStatus: React.PropTypes.object
};

MemoList.defaultProps = {
    data: [],
    currentUser: '',
    onEdit: (id, index, contents) => { 
        console.error('edit function not defined'); 
        
    },
    editStatus: {},
    onRemove: (id, index) => { 
        console.error('remove function not defined'); 
    },
    onRemoveData: (index) => {
        console.error('remove data function not defined');
    },
    removeStatus: {}
};

export default MemoList;
