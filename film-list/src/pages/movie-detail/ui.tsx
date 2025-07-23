import { MovieDetailCard } from "@/entities/movie/ui/MovieDetailCard";
import { useParams } from "react-router-dom";

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return <div>{id && <MovieDetailCard id={id} />}</div>;
};
