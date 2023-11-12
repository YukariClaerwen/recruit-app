"use client";
import { X } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { FormProvider } from "react-hook-form";

export default function Dialog({ title, onClose, onOk, children, onShow, onSave, form }) {

    const searchParams = useSearchParams();
    const dialogRef = useRef(null, searchParams);
    const showDialog = searchParams.get('showDialog');

    useEffect(() => {
        if (showDialog === "y") {
            dialogRef.current?.showModal();
            onShow();
        } else {
            dialogRef.current?.close();
        }
    }, [showDialog])

    const closeDialog = (e) => {
        dialogRef.current?.close();
        onClose();
    }

    const clickOk = () => {
        onOk();
        closeDialog();
    }
    const clickSave = async () => {
        await onSave();
        closeDialog();
    }

    const preventClose = (e) => {
        e.stopPropagation();
    }

    const dialog = showDialog === 'y'
        ? (
            <dialog ref={dialogRef} onClick={closeDialog}>
                <div className="modal fade show block" >
                    <div className="modal-dialog modal-dialog-centered" onClick={preventClose}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <button type="button" className="btn-close" onClick={closeDialog}><X size={20} weight="thin" /></button>
                            </div>
                            <FormProvider {...form}>
                                <form onSubmit={form.handleSubmit(onSave)} noValidate>
                                    <div className="modal-body">
                                        {children}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={clickOk}>Bỏ qua</button>
                                        <button type="submit" className="btn btn-mainCl">Lưu</button>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                </div>
            </dialog>
        ) : null

    return dialog
}
