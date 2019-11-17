create table user (
    id int not null primary key auto_increment,
    pseudo varchar(50) unique not null
);

create table messages (
    id int not null primary key auto_increment,
    emetteur varchar(50) not null,
    date datetime not null
);