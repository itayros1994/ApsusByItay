export class EmailFilter extends React.Component {

    render() {

        return <div>
            <select className="mails-filter" name="mails">
                <option value="Mails-Read">Mails-Read</option>
                <option value="Text">Text</option>
            </select>

        </div>
    }

}