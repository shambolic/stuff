add2 <- function (x,y){
  x +y
}
above10 <- function (x){
  use <- x > 10  ## creates logical vector
  x[use]
}

above <- function (x, n =10) {  #sets the default value to 10.
  use <- x > n
  x[use]
}

columnMean <- function (x, removeNA = TRUE) { 
  # takes a data frame, has a removeNA argument which defaults to TRUE
  nc <- ncol(x) # get the number of columns
  means <- numeric(nc)  # initialise empty numeric vector
  for (i in 1:nc) {
    means[i] <- mean(x [,i], na.rm=removeNA)
  }
  means
}