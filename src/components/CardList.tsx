import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [currentImageUrl, setCurrentImageUrl] = useState('');

  function handleViewImage(imgUrl: string): void {
    onOpen();
    setCurrentImageUrl(imgUrl);
  }

  return (
    <>
      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        {cards.map(card => (
          // eslint-disable-next-line react/jsx-no-bind
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>
      <ModalViewImage
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={currentImageUrl}
      />
    </>
  );
}
