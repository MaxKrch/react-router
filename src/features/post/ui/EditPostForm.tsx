import { useCallback } from "react";
import PostForm from "./PostForm";
import { ROUTES } from "@/shared/const/routes";
import { useNavigate } from "react-router-dom";

import usePostForm from "../model/use-post-form";
import usePostDetails from "@/features/post/model/use-post-details";

const EditPostForm = () => {
    const navigate = useNavigate()
    const post = usePostDetails();
    const onSuccess = useCallback(() => {
        navigate(ROUTES.SOCIAL_NETWORK.POST_FEED)
    }, [])

    const {
        formRef,
        handleSubmit,
        handleCancel,
        error,
        submitting,
    } = usePostForm({
        mode: 'edit',
        initialData: post,
        onSuccess: onSuccess,
    })
    return (
        <PostForm
            ref={formRef}
            mode="edit"
            title="Обновление поста"
            action={ROUTES.SOCIAL_NETWORK.UPDATE_POST}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitDisabled={submitting}
            error={error}
        />
    )
}

export default EditPostForm