import Link from 'next/link';
import { useRouter } from 'next/router';
import Seo from '../components/Seo';

export default function Home({ results }) {
    const router = useRouter();

    const onClick = (id, title) => {
        router.push(`/movies/${title}/${id}`);
    };

    return (
        <div className='container'>
            <Seo title='Home' />
            {results?.map((movie) => (
                <div
                    onClick={() => onClick(movie.id, movie.title)}
                    className='movie'
                    key={movie.id}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    />
                    <Link href={`/movies/${movie.original_title}/${movie.id}`}>
                        <h4>{movie.original_title}</h4>
                    </Link>
                </div>
            ))}

            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 1.25rem;
                    gap: 1.25rem;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie {
                    cursor: pointer;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-4px);
                }
                .movie h4 {
                    font-size: 1.25rem;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}

export async function getServerSideProps() {
    // here is where you could also put API keys, etc.
    // only visible on the server side !

    const { results } = await (
        await fetch(`http://localhost:3000/api/movies`)
    ).json();
    // ERROR: absolute url; cannot just keep the url as /api/movies,
    // as the server does not know this url.

    return {
        props: {
            results,
        },
    };
}
