---
title: "[Database] Database Systems"
categories:
  - database
tags:
  - dbms
toc: true
toc_sticky: true
toc_label: "Basic Concepts"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d3afe0a4-ef5a-4cbe-a983-bd03933e03ec)

<br>

# Database

- Data
  - : Structured, Semi-structured, Unstructured

- Database: A Collection of Data
  - Relevant
  - Huge Volume
  - Disk Resident
  - Operational: Retrieve, Insert, Update, Delete
  - Shared by Multiple Users

- Database Management System (DBMS)
  - : A software package to store and manage databases.

- Database System
  - : Database + DBMS

---

## Database Example: University

- Entities:
  - STUDENTs
  - COURSEs
  - SECTIONs
  - CLASSROOMs
  - PROFESSORs
  - . . . . . . . .
- Relationships:
  - STUDENTs have grade-report with SECTIONs
  - COURSEs have prerequisite COURSEs
  - STUDENTs have advisor among PROFESSORs
  - COURSEs are reserved by CLASSROOMs

---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b0152e36-66e6-4e57-9965-4624a4dd5911)

<br>

## Simplified Database System

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/de6bab10-4033-49cf-91ed-15da8a3b1540)

<br>

## Without DBMS : File Systems

- Controlled by OS
- Data is stored as records in traditional regular files
- Records have a simple structure and fixed number of fields
- File structures are embedded in application programs
- No query language for retrieving/updating data
- No special programs manage and control data

<br>

# DBMS

<br>

## Why DBMS? : Problems of File Systems

- Difficulty for **Data Abstraction**
  - Users must specify physical structures of database on their application programs.
  - It is hard to hide complex physical structures to users.

<br>

- **Data/Program Dependency** Problem
  - User application program is dependent on physical structures of database stored on disk.
  - If physical structures are changed, then its application program also must be changed; Thus, Need to rewrite new program.
 
<br>

- **Data Redundancy** Problem
  - Duplicates of same information may exist on files
  - Storage Waste, **Data Inconsistency**

<br>

- Difficulty for **Data Integrity**
  - DB must obey and check integrity constraints .
  - Example:
    - Student IDs must be distinct.
    - Bank account balance > $100.
    - Every student takes 3 ~ 6 courses per semester.
   
<br>

- Difficulty for **Query Processing**
  - Need optimal query **optimization** for fast query processing.
  - Uncontrolled query processing can lead to incredibly slow response time.
 
<br>

- Difficulty for **Concurrent Access**
  - Need to allow for many users to access database at the same time
  - Uncontrolled accesses can lead to inconsistencies;
  - Example : Money transfer from account A to B and withdraw from B.
  - Concurrency control must be needed.

<br>

- Difficulty for **Data Recovery**
  - System failures may leave database in inconsistencies.
  - Example : Failure during money transfer from account A to B.
  - Must restore data to correct state.
 
<br>

- Difficulty for **Data Security**
  - Need to prohibit some users to access to sensitive data.
  - Need to classify access authorizations retrieval and updates.
 
<br>

## What DBMS Provides?

- Data abstraction (Insulation of program and data)
- Create database on a secondary storage.
- Query language for retrieving/updating database
- Sharing of data among multiple users
- Transaction Control : Concurrent Processing
- Restricting unauthorized access to data.
- Recovery from system failures.
- Query Optimizer for efficient query processing

<br>

## DBMS Architecture

..

## Database Query Language

- Database Query Language consist of two parts:
  - (1) **DDL** (Data Definition Language)
    - Define schema, table, and views
    - CREATE, DROP, ALTER
  - (2) **DML** (Data Manipulation Language)
    - Retrieve and modify database instances
    - SELECT, INSERT, DELETE, UPDATE
- SQL is the most widely used query language

<br>

## Storing Database

- Typical Database Files (= Physical Structures)
  - Heap File
  - Sequential File
  - Indexing File : B+ Tree
  - Hashing File

<br>

# ANSI : 3-Schema Architecture

- Data in DBMS is described by schemas at 3 levels:
  - Physical Schema
    - Describe internal structures of database (How data **stored** physically?)
- Conceptual schema
  - Describe conceptual structures of database (What is **meaning** of data?)
- External schemas (= Views)
  - Describe the various user needs. (What is **use** (part) of data?)
 
<br>

## Levels of Abstractions in DBMS: 3 Schema Architecture

- Data in DBMS is described at *three* levels :

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/07c78591-da7e-4bc2-ae60-bde29cb4a242)

<br>

## 3-Schema Architecture : Example

- External schema (View):
  - Senior_Cust (cname: string, age: string)
  - Buy_Info (cname: string, pname: string, price: real)
- Conceptual schema:
  - Customers (cid: string, cname: string, age: integer)
  - Purchase (cid: string, pid: string, price: real)
  - Products (pid: string, pname: string, color: string)
- Physical schema:
  - Customers stored as ordered(sorted) by cname.
  - Products stored as (Hash) Index on cid

<br>

## 3-Schema Architecture : Advantages

- Separate application programs and physical database.
- Support multiple user views
- Higher level schema hides low level schemas
  - Conceptual schema hides physical schema
  - External schema hides conceptual schema
- Can provide data independence more easily
  - Logical Data Independence
  - Physical Data Independence
