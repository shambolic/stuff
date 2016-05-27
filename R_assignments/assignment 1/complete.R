complete <- function(directory, id=1:322) {

        source("pollutantmean.R")
        # load data from files 
        data <-loadData(directory)
        # select data from id paramaters
        sub <- data[which(data$ID %in% id),]
       # initialise vectors for columns
        ids <- c()
        sums <- c()
        
                for (i in id ) {
                        ids = append(ids, i)
                        sums = append(sums, sum(complete.cases(sub[which(sub$ID==i),])))
                }
        data.frame(id =ids, nobs = sums)
}
# complete("specdata", 30:25)