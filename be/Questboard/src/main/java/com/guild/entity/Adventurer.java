package com.guild.entity;

import java.util.Date;

public class Adventurer {

    private Integer aid;
    private String aname;
    private String account;
    private String password;
    private String gender;
    private Species species;
    private String job;
    private String astatus;
    private int exp;
    private String rank;
    private Date registeredTime;
    private Date modifiedTime;
    private String role;

    public Integer getAid() {
        return aid;
    }

    public void setAid(Integer aid) {
        this.aid = aid;
    }

    public String getAname() {
        return aname;
    }

    public void setAname(String aname) {
        this.aname = aname;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Species getSpecies() {
        return species;
    }

    public void setSpecies(Species species) {
        this.species = species;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getAstatus() {
        return astatus;
    }

    public void setAstatus(String astatus) {
        this.astatus = astatus;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public Date getRegisteredTime() {
        return registeredTime;
    }

    public void setRegisteredTime(Date registeredTime) {
        this.registeredTime = registeredTime;
    }

    public Date getModifiedTime() {
        return modifiedTime;
    }

    public void setModifiedTime(Date modifiedTime) {
        this.modifiedTime = modifiedTime;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Adventurer{" +
                "aid=" + aid +
                ", aname='" + aname + '\'' +
                ", account='" + account + '\'' +
                ", password='" + password + '\'' +
                ", gender='" + gender + '\'' +
                ", species=" + species +
                ", job='" + job + '\'' +
                ", astatus='" + astatus + '\'' +
                ", exp=" + exp +
                ", rank='" + rank + '\'' +
                ", registeredTime=" + registeredTime +
                ", modifiedTime=" + modifiedTime +
                ", role='" + role + '\'' +
                '}';
    }
}
