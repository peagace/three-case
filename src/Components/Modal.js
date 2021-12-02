import React, { useRef, useState, Suspense } from 'react'

export default function Modal() {
    const [modal, setModal] = useState(true)
    return (
        <>
            {modal ? (
                <div className="modal">
                    <button onClick={() => {
                        setModal(false)
                    }}>CLOSE</button>
                </div>
            ) : (null)}
        </>
    );
}