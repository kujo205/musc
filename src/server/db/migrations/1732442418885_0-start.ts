import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<never>): Promise<void> {
  await db.executeQuery(
    sql`
        CREATE TABLE Account
        (
            id                 varchar(36)  NOT NULL DEFAULT (uuid()),
            userId             varchar(36)  NOT NULL,
            type               varchar(255) NOT NULL,
            provider           varchar(255) NOT NULL,
            providerAccountId  varchar(255) NOT NULL,
            refresh_token      varchar(255)          DEFAULT NULL,
            access_token       varchar(555)          DEFAULT NULL,
            expires_at         bigint                DEFAULT NULL,
            token_type         varchar(255)          DEFAULT NULL,
            scope              varchar(255)          DEFAULT NULL,
            id_token           text,
            session_state      varchar(255)          DEFAULT NULL,
            oauth_token_secret varchar(255)          DEFAULT NULL,
            oauth_token        varchar(255)          DEFAULT NULL,
            PRIMARY KEY (id),
            KEY Account_userId_index (userId)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `.compile(db)
  );

  await db.executeQuery(
    sql`
        CREATE TABLE Session
        (
            id           varchar(36)  NOT NULL DEFAULT (uuid()),
            userId       varchar(36)  NOT NULL,
            sessionToken varchar(255) NOT NULL,
            expires      datetime(3) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY sessionToken (sessionToken),
            KEY Session_userId_index (userId)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `.compile(db)
  );

  await db.executeQuery(
    sql`
        CREATE TABLE VerificationToken
        (
            identifier varchar(255) NOT NULL,
            token      varchar(255) NOT NULL,
            expires    datetime(3) NOT NULL,
            UNIQUE KEY token (token)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `.compile(db)
  );

  await db.executeQuery(
    sql`
        CREATE TABLE User
        (
            id            varchar(36)  NOT NULL DEFAULT (uuid()),
            name          varchar(255)          DEFAULT NULL,
            email         varchar(255) NOT NULL,
            emailVerified datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
            image         varchar(255)          DEFAULT NULL,
            subscription_type  enum('free','paid')  DEFAULT 'free',
            ytmusic_cookie varchar(10000) null,
            PRIMARY KEY (id),
            UNIQUE KEY email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `.compile(db)
  );
}
