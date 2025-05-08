show databases;
-- drop database Municipal_Complaint; 
create database Municipal_Complaint;
 use Municipal_Complaint;
CREATE TABLE Roles (
    RoleId INT AUTO_INCREMENT PRIMARY KEY,
    Role VARCHAR(15) NOT NULL,
    createdBy CHAR(7) DEFAULT 'SYSTEM',
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    modifiedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activeState BOOLEAN DEFAULT TRUE
);

ALTER TABLE Roles MODIFY Role VARCHAR(30) NOT NULL;


CREATE TABLE Users (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(10) NOT NULL,
    MiddleName VARCHAR(10),
    LastName VARCHAR(10) NOT NULL,
    Email VARCHAR(100) NOT NULL,
  
    Phone VARCHAR(10) NOT NULL,
    Address VARCHAR(50),
    Pincode VARCHAR(7),
    State VARCHAR(50) NOT NULL,
    District VARCHAR(20) NOT NULL,
    City VARCHAR(20) NOT NULL,
    IsRegistered BOOLEAN DEFAULT TRUE,
    CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    ModifiedDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ActiveState BOOLEAN DEFAULT TRUE,	
    ModifiedBy VARCHAR(20),
    RoleId INT,
    FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
);
ALTER TABLE Users
ADD COLUMN Password VARCHAR(200) NOT NULL;



CREATE TABLE States (
    StateId INT AUTO_INCREMENT PRIMARY KEY,
    State VARCHAR(15) NOT NULL,
    CreatedBy VARCHAR(50),
    CreatedDate DATETIME,
    ModifiedBy VARCHAR(50),
    ModifiedDate DATETIME,
    ActiveStatus BOOLEAN DEFAULT TRUE
);

CREATE TABLE Districts (
    DistrictID INT AUTO_INCREMENT PRIMARY KEY,
    District VARCHAR(50) NOT NULL,
    StateID INT,
    CreatedBy VARCHAR(50),
    CreatedDate DATETIME,
    ModifiedBy VARCHAR(50),
    ModifiedDate DATETIME,
    ActiveStatus BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (StateID) REFERENCES States(StateID)
);

CREATE TABLE Cities (
    CityID INT AUTO_INCREMENT PRIMARY KEY,
    City VARCHAR(50) NOT NULL,
    DistrictID INT,
    StateID INT,
    CreatedBy VARCHAR(50),
    CreatedDate DATETIME,
    ModifiedBy VARCHAR(50),
    ModifiedDate DATETIME,
    ActiveStatus BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID),
    FOREIGN KEY (StateID) REFERENCES States(StateID)
);

CREATE TABLE Wards (
    WardID INT AUTO_INCREMENT PRIMARY KEY,
    City VARCHAR(50) NOT NULL,
    CityID INT,
    AreaCovered VARCHAR(255),
    CreatedBy VARCHAR(50),
    CreatedDate DATETIME,
    ModifiedBy VARCHAR(50),
    ModifiedDate DATETIME,
    ActiveStatus BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (CityID) REFERENCES Cities(CityID)
);
CREATE TABLE ComplaintType (
    ComplaintTypeID INT AUTO_INCREMENT PRIMARY KEY,
    ComplaintType VARCHAR(50) NOT NULL,
    Description TEXT
);


CREATE TABLE ComplaintStatus (
    StatusID INT AUTO_INCREMENT PRIMARY KEY,
    Status VARCHAR(50) NOT NULL
);


CREATE TABLE Complaints (
    ComplaintID INT AUTO_INCREMENT PRIMARY KEY,
    WardID INT,
    GeoLat DECIMAL(10, 6),
    GeoLong DECIMAL(10, 6),
    Description TEXT,
    Image1 BLOB,
    Image2 BLOB,
    Image3 BLOB,
    ComplaintTypeID INT,
    UserID INT,
    Status INT,
    CreatedBy VARCHAR(50),
    CreatedDate DATETIME,
    ModifiedBy VARCHAR(50),
    ModifiedDate DATETIME,
    ActiveStatus BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (WardID) REFERENCES Wards(WardID),
    FOREIGN KEY (ComplaintTypeID) REFERENCES ComplaintType(ComplaintTypeID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),  -- Assuming a Users table exists
    FOREIGN KEY (Status) REFERENCES ComplaintStatus(StatusID)
);







