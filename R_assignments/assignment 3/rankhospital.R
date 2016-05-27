# assignment 3 - health data - question 3
rankhospital <- function(state, outcome, num="best") {
        # source("best.R", verbose=TRUE)  --need to fix source. no time NB: it was because i initially called the function RANK - and overrode the internal function
        validateStates <-function(state, outcome.data) {
                states <- unique(outcome.data[,7])
                if (!state %in% states) {stop("invalid state")}
        }
        validateOutcomes <- function(outcome, possible.outcomes){
                if (!outcome %in% possible.outcomes) {stop("invalid outcome")}     
        }
        subStates <-function (state, data){
                state.data <<- data[which(data$State == state), ]   # 'which' returns the index for which the condition is true (i.e. = min)
        }
                ## Read outcome data
        data <- read.csv(file="outcome-of-care-measures.csv", stringsAsFactors = FALSE)  # important to turn off Factors
        # Check that state and outcome are valid
        states <- unique(data$State)
        possible.outcomes <- c("heart attack", "heart failure", "pneumonia")
        if(outcome == "heart attack") col.number = 11
        if(outcome == "heart failure") col.number = 17
        if(outcome == "pneumonia") col.number = 23
        
        # Handle arguments
        validateStates(state, data)
        validateOutcomes(outcome, possible.outcomes)
        subStates(state, data)
        
        # recode 'not available' to NA's to be able to coerce to numerics and get minimum
        state.data[,col.number][state.data[,col.number]=="Not Available"] <- NA
        # remove NA's for given outcome
        state.data <- state.data[!is.na(state.data[,col.number]),]
        # coerce to numberic    
        state.data[,col.number] <-as.numeric(state.data[,col.number])

        hospitals <- nrow(state.data)  # count number of hospitals in state (after removing NAs!)
        if (num == "best") num = 1
        if (num == "worst") num = hospitals
        if (num > hospitals) NA
        
        ## Return hospital name in that state with the given rank
        ranked.index <- rank(state.data[,col.number])
        # ranked <- state.data[ranked.index[num], 2]
        rankings <- data.frame(ranks=ranked.index, name=state.data[,2], value=state.data[,col.number])
        ordered <-rankings[with(rankings, order(ranks, name)),]
        df <- sapply(ordered, is.factor) # remove factors
        ordered[df] <-lapply(ordered[df], as.character)
        ordered[,2][num]
}
# rankhospital("DE", "heart attack", 2)
rankhospital("NY", "heart attack", 7)