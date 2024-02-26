import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  List,
  ListItem,
  Text,
} from "@yamada-ui/react";

type CardItemItem = {
  list: string;
};

export const CardItem = ({ list }: CardItemItem) => {
  return (
    <Card size="md" width="300px" height="400px">
      <CardHeader>
        <Heading as="h3" size="md">
          {list}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>
          残り
          <Box as="span" fontSize="48px" fontWeight="bold">
            5
          </Box>
          日
        </Text>
        <List>
          <ListItem>在庫: 1</ListItem>
          <ListItem>買替日数/個: 30日</ListItem>
          <ListItem>最終購入日: 2024/01/28</ListItem>
          <ListItem>在庫切れ予定日: 2024/02/28</ListItem>
        </List>
      </CardBody>
      <CardFooter display="flex" justifyContent="end">
        <Button bg="primary" color="white">
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
