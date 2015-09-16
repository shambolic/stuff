#!/usr/bin/ruby
require 'rubygems'
require 'sinatra'
require 'csv'
require 'json'
require 'uri'
require 'net/http'
require 'date'

get '/'  do

  # @projectID = 926050
  @token ='246b6e706fd8e0b97271d58e6681ad60'
  @states = ['accepted', 'rejected','delivered','finished','started','unstarted']
  @uriBase = 'https://www.pivotaltracker.com/services/v5/projects'

  # @filter = URI.escape("created_after=2014-01-30T00:00:00Z&created_before=2014-02-01T00:00:00Z&with_state=accepted")
  @jayP = "params: #{params.inspect}"

  if !(params.empty?)
    #figure out a way to get at params here.
    @startDate = params[:start]
    @endDate = params[:end]
    @state = params[:state]
    @projectID = params[:id]

  else
  # set default date ranges to a month from yesterday
   @yesterday = DateTime.now - 1
   @endDate = DateTime.strptime(@yesterday.to_s, '%Y-%m-%dT%H:%M:%S').to_s.sub(/\+00:00/,'Z')
   @startDateDT = @yesterday << 1
   @startDate = DateTime.strptime(@startDateDT.to_s, '%Y-%m-%dT%H:%M:%S').to_s.sub(/\+00:00/,'Z')
   @state = 'accepted'
   @projectID = 1023974
 end

# => startDate = "created_after=" + DateTime.strptime(ARGV[1],'%Y-%m-%d').to_s.sub(/\+00:00/, 'Z')
#    response.set_cookie("startDate",@startDate)
#    response.set_cookie("endDate", @endDate)


  def getProjectIDs (token)
    uri = URI.parse("https://www.pivotaltracker.com/services/v5/projects/")
    http= Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    request = Net::HTTP::Get.new(uri.request_uri)
    request ['X-TrackerToken'] = "#{token}"
    response = http.request(request)
    responseArray = JSON.parse(response.body)
    @ids = Array.new
    responseArray.each {|project|
    projectHash = project.to_hash
    @ids.push(projectHash["name"] => projectHash["id"])
    }
  end

    def getStories(projectID, startDate, endDate, state)
      uri = URI.parse("#{@uriBase}/#{@projectID}/stories?created_after=#{startDate}&created_before=#{endDate}&with_state=#{state}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Get.new(uri.request_uri)
      request['X-TrackerToken'] = @token
      response = http.request(request)
      responseArray = JSON.parse(response.body)
      @points = 0
      @numStories = 0
      @stories = Array.new
      puts "responseArray is:\n#{responseArray.inspect}\n"
      responseArray.each {|story|

         @stories.push(story)
         storyHash = story.to_hash
         @points += storyHash["estimate"].to_i
         @numStories += 1
      }
      @average = @points/@numStories.to_f
    end

  getProjectIDs @token

  getStories @projectID, @startDate, @endDate, @state

  erb :index

end
