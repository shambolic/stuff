corr  <- function(directory, threshold=0) {
        source("pollutantmean.R")
        # load data from files 
        data <-loadData(directory)
        above.id <-c()
        # sum the completed cases for each ID
        above.threshold <- function(data, threshold){   # returns list of monitors which are above threshold
                monitors <- unique(data$ID)
                for (monitor in monitors){
                       sum <- sum(complete.cases(data[which(data$ID==monitor),]))
                       if (sum > threshold){
                               above.id = append(above.id,monitor)
                                }
                        }
                assign("above", above.id, envir=.GlobalEnv)
        }
        above.threshold(data, threshold)

calculate.correlation <- function(above, data){
        # # calculate the correlation between sulfate and nitrate and return a vector of correlations OR vector(length 0) if nothing meets the threshold requirements
        correlations <- c()
        
        for (station in above){
        #select data for station, 
                st <- data[which(data$ID == station),]
                complete <- st[complete.cases(st),]
                sulf <- complete$sulfate
                nitr <- complete$nitrate
                correlations = append(correlations, cor(sulf, nitr))
          }
        correlations
        }
calculate.correlation(above, data)
}
# cr <- corr("specdata", 150)
# summary(cr)