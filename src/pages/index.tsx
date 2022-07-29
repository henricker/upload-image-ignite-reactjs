import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { GetImageResponse } from '../interfaces/getImageResponse';

export default function Home(): JSX.Element {
  async function fetchData({ pageParam = null }): Promise<GetImageResponse> {
    const { data } = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchData, {
    getNextPageParam: lastPageData =>
      lastPageData ? lastPageData.after : null,
  });

  const formattedData = useMemo(() => {
    const dataFormatted = data?.pages.flatMap(page => {
      return page.data.flat();
    });

    return dataFormatted;
  }, [data]);

  if (isLoading && !isError) {
    return <Loading />;
  }

  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
