import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type Props = {
    params: Promise<{ slug: string[] }>;
}

const NotesByTag = async ({ params }: Props) => {
    const { slug } = await params;
    const queryClient = new QueryClient()
    const currentPage = 1;
    


    const tagName = slug[0] === "All" ? undefined : slug[0]

    await queryClient.prefetchQuery({
        queryKey: ['notes', currentPage, tagName],
        queryFn: () => fetchNotes({ tag: tagName, page: currentPage, search: '' })
    })


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tagName} />

        </HydrationBoundary>

    )
}

export default NotesByTag