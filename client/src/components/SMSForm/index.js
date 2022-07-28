import React, { useState } from 'react';
import { Form, Input, Button } from 'reactstrap';
import './SMSForm.css';

function SMSForm({ babysitterPh, babysitterAuthor }) {
    const [message, setMessage] = useState({ to: babysitterPh, body: '' })
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(false)
    function onHandleChange(event) {
        const name = event.target.getAttribute('name');
        setMessage({
            ...message,
            [name]: event.target.value
        }
        );
    }
    function onSubmit(event) {
        event.preventDefault();
        setSubmitting(true);
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setMessage({
                        to: babysitterPh,
                        body: ''
                    })
                    setSubmitting(false);
                    setError(false);
                } else {
                    setSubmitting(false);
                    setError(true);
                }
            });
    }
    return (
        <Form
            onSubmit={onSubmit}
            className={error ? 'error sms-form' : 'sms-form'}
        >
            <div>
                <h4 className="title">
                    <small>Contact {babysitterAuthor} via SMS</small>
                </h4>
                <label htmlFor="body">Body:</label>
                <Input
                    name="body"
                    id="body"
                    value={message.body}
                    onChange={onHandleChange} />
            </div>
            <Button className='btn' type="submit">
                Send message
            </Button>
        </Form>
    );
}

export default SMSForm;