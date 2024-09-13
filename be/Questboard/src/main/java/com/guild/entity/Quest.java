package com.guild.entity;


import java.util.Date;

public class Quest {

    private Integer qid;
    private String title;
    private String description;
    private String requirements;
    private String timeframe;
    private String exp;
    private String rewards;
    private String status;
    private String requester;
    private Adventurer requestee;
    private Date registeredTime;
    private Date modifiedTime;


    public Integer getQid() {
        return qid;
    }

    public void setQid(Integer qid) {
        this.qid = qid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getTimeframe() {
        return timeframe;
    }

    public void setTimeframe(String timeframe) {
        this.timeframe = timeframe;
    }

    public String getExp() {
        return exp;
    }

    public void setExp(String exp) {
        this.exp = exp;
    }

    public String getRewards() {
        return rewards;
    }

    public void setRewards(String rewards) {
        this.rewards = rewards;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
    }

    public Adventurer getRequestee() {
        return requestee;
    }

    public void setRequestee(Adventurer requestee) {
        this.requestee = requestee;
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

    @Override
    public String toString() {
        return "Quest{" +
                "qid=" + qid +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", requirements='" + requirements + '\'' +
                ", timeframe='" + timeframe + '\'' +
                ", exp=" + exp +
                ", rewards='" + rewards + '\'' +
                ", status='" + status + '\'' +
                ", requester='" + requester + '\'' +
                ", requestee=" + requestee +
                ", registeredTime=" + registeredTime +
                ", modifiedTime=" + modifiedTime +
                '}';
    }
}
