import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../routes";
import { ROUTES } from "@/shared/const/routes";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import generatePathWithId from "@/shared/lib/router/generate-path-with-id";

const mockCreatePostAction = vi.fn();
const mockUpdatePostAction = vi.fn();
const mockDeletePostAction = vi.fn();
const mockNetworkLoader = vi.fn()

vi.mock('../network.actions', () => ({
    createPostAction: mockCreatePostAction,
    updatePostAction: mockUpdatePostAction,
    deletePostAction: mockDeletePostAction,
    networkLoader: mockNetworkLoader,
}));

vi.mock("@/pages/Network/PostDetails", () => ({
    default: () => <div>Post Details</div>
}))

vi.mock("@/pages/Network/CreatePost", () => ({
    default: () => <div>Create Post</div>
}))

vi.mock("@/pages/Network/EditPost", () => ({
    default: () => <div>Edit Post</div>
}))

describe('networkRoutes routing', () => {
    describe('routing', () => {
        it('redirects from /network to /network/feed', async () => {
            const router = createMemoryRouter(routes, {
                initialEntries: [ROUTES.SOCIAL_NETWORK.BASE]
            })

            render(<RouterProvider router={router} />)

            expect(await screen.findByText('Создать пост')).toBeInTheDocument()
        });

        it('renders PostFeed component on /network/feed', async () => {
            const router = createMemoryRouter(routes, {
                initialEntries: [ROUTES.SOCIAL_NETWORK.POST_FEED]
            })

            render(<RouterProvider router={router} />)

            expect(await screen.findByText('Создать пост')).toBeInTheDocument()        
        });


        it('renders PostDetails component on /network/post/:id', async () => {
            const router = createMemoryRouter(routes, {
                initialEntries: [generatePathWithId(ROUTES.SOCIAL_NETWORK.POST_DETAILS, 5)]
            })

            render(<RouterProvider router={router} />)

            expect(await screen.findByText('Post Details')).toBeInTheDocument()       
        });


        it('renders CreatePost component on /network/new', async () => {
            const router = createMemoryRouter(routes, {
                initialEntries: [ROUTES.SOCIAL_NETWORK.NEW_POST]
            });

            render(<RouterProvider router={router} />);

            expect(await screen.findByText('Create Post')).toBeInTheDocument();
        });

        it('renders EditPost component on /network/edit/:id', async () => {
            const path = generatePathWithId(ROUTES.SOCIAL_NETWORK.EDIT_POST, 3);
            const router = createMemoryRouter(routes, {
                initialEntries: [path]
            });

            render(<RouterProvider router={router} />);

            expect(await screen.findByText('Edit Post')).toBeInTheDocument();
        });        
    })
})