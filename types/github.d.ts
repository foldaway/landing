declare namespace GitHub.GraphQL.API {
  interface Organization {
    membersWithRole: OrganizationMemberConnection;
    pinnedItems: PinnableItemConnection;
  }

  interface OrganizationMemberConnection {
    edges: OrganizationMemberEdge[];
  }

  interface OrganizationMemberEdge {
    node: User;
    cursor: string;
  }

  type PinnableItem = Repository;

  interface PinnableItemEdge {
    node: PinnableItem;
    cursor: string;
  }

  interface PinnableItemConnection {
    edges: PinnableItemEdge[];
  }

  interface Repository {
    name: string;
    description: string;
    url: string;
  }

  interface User {
    name: string;
    login: string;
    avatarUrl: string;
    websiteUrl: string;
    url: string;
  }
}
