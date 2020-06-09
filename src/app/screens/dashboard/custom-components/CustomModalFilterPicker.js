import ModalFilterPicker from "react-native-modal-filter-picker";

export default class CustomModalFilterPicker extends ModalFilterPicker {
    onFilterChange = (text) => {
        const { options } = this.props

        const filter = text.toLowerCase()

        // apply filter to incoming data
        const filtered = (!filter.length)
            ? options
            : options.filter(({ searchKey, label, key }) => ( label.toLowerCase().startsWith(filter) ))

        this.setState({
            filter: text.toLowerCase(),
            ds: this.state.ds.cloneWithRows(filtered)
        })
    }
}
