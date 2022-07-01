export type ChatListItemData = {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
};

export const ChatList: Array<ChatListItemData> = [
  {
    id: '0',
    avatar:
      'https://pbs.twimg.com/profile_images/1484604685671493632/nifvTODz_400x400.png',
    name: 'Franz Srambical',
    lastMessage: 'Hello',
  },
  {
    id: '1',
    avatar:
      'https://pbs.twimg.com/profile_images/1490533817416925189/oDKK6UFj_400x400.jpg',
    name: 'kavin_jj',
    lastMessage: "Let's go and eat some Hamburgers! <3",
  },
  {
    id: '2',
    avatar:
      'https://pbs.twimg.com/media/FEaFK4OWUAAlgiV?format=jpg&name=900x900',
    name: 'Martin',
    lastMessage:
      'Would you like to go coconut phishing with me? I ran out of coconuts yesterday :( .....',
  },
];

export type messageClusterItem = {
  id: string;
  date: string;
  senderId: string;
  message: string;
};

export const messageCluster: Array<messageClusterItem> = [
  {
    id: '0',
    date: '2020-01-01',
    senderId: 'd3kc4so2hw',
    message:
      'Smallest directly families surprise honoured am an. Speaking replying mistress him numerous she returned feelings may day. Evening way luckily son exposed get general greatly. Zealously prevailed be arranging do.',
  },
  {
    id: '1',
    date: '2020-01-01',
    senderId: 'iazenic7j3',
    message:
      'Forfeited you engrossed but gay sometimes explained. Another as studied it to evident. Merry sense given he be arise. Conduct at an replied removal an amongst. Remaining determine few her two cordially admitting old. Sometimes strangers his ourselves her depending you boy. Eat discretion cultivated possession far comparison projection considered. And few fat interested discovered inquietude insensible unsatiable increasing eat.',
  },
  {
    id: '2',
    date: '2020-01-01',
    senderId: 'd3kc4so2hw',
    message: `#### Markdown test
    > blockquote`,
  },
  {
    id: '3',
    date: '2020-01-01',
    senderId: 'd3kc4so2hw',
    message: `<img src='https://www.onlinesolutionsgroup.de/wp-content/uploads/giphy.gif' /> <br> <h4>Mardown test 2</h4>`,
  },
  {
    id: '4',
    date: '2020-01-01',
    senderId: 'd3kc4so2hw',
    message: `<center><h4>Markdown <strong>test</strong> 3</h4></center><br><iframe width="510px" height="300px" src="https://www.youtube.com/embed/eWEgUcHPle0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><iframe width="510px" height="300px" src="https://en.wikipedia.org/wiki/Main_Page" title="W3Schools Free Online Web Tutorials"></iframe>`,
  },
  {
    id: '5',
    date: '2020-03-04',
    senderId: 'iazenic7j3',
    message:
      "Would you like to go coconut phishing with me? I ran out of coconuts yesterday :(. I know I didn't eat them last time but this time I will.",
  },
];
