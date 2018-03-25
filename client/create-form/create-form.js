/* eslint-disable no-unused-vars */
import { Component } from '../component/index';
import { ErrorBox } from '../error-box/error-box';
import s from './create-form.css';
/* eslint-enable no-unused-vars */

export class CreateForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isFetching: false
        };

        this.onClearError = this.onClearError.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    shouldUpdate() {
        return false;
    }

    render() {
        const { error, isFetching } = this.state;

        return (
            <div>
                <form class={s.form} onSubmit={this.onSubmit}>
                    <input
                        class={s.input}
                        name="title"
                        type="text"
                        placeholder="Введите название места"
                        onInput={this.onClearError}
                        readOnly={isFetching}
                        autocomplete="off"
                    />
                    <button class={s.button} disabled={isFetching}>Добавить</button>
                </form>
                <ErrorBox error={error}/>
            </div>
        );
    }

    /**
     * @param {Event} evt
     */
    onClearError(evt) {
        evt.preventDefault();
        if (this.state.error) {
            this.setState({ error: null });
        }
    }

    /**
     * @param {Event} evt
     */
    onSubmit(evt) {
        evt.preventDefault();
        const isFetching = this.state.isFetching;

        if (isFetching) {
            return;
        }

        const name = evt.target.elements.namedItem('title').value;

        if (!name) {
            this.setState({ error: 'Название не может быть пустым' });
            return;
        }

        this.setState({ isFetching: true });
        this.props.onAddPlace({ name })
            .then(() => {
                this.setState({ isFetching: false });
                evt.target.reset();
            })
            .catch((reason) => this.setState({ isFetching: false, error: reason }));
    }
}