import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
 const { slug = [] } = await params;

const category =
  slug.length > 0 && slug[0] !== 'all'
    ? slug[0]
    : undefined;
  const response = await fetchNotes({ page: 1, search: '', tag: category });

  return (
    <div>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </div>
  );
};

export default NotesByCategory;