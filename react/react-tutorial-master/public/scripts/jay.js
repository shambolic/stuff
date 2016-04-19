//comment tree:  Box => List => Comment => Form
      var CommentBox = React.createClass({
        loadCommentsFromServer: function(){
          $.ajax({
            url: this.props.url_jay,
            dataType: 'json',
            cache: 'false',
            success: function (data){
              this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
        },
        getInitialState: function(){
          return {data: [] };
        },
        componentDidMount: function(){
          this.loadCommentsFromServer();
          setInterval(this.loadCommentsFromServer, this.props.pollInterval);
        },
          render: function() {
            return (
              < div className = "commentBox">
              <h1>Comments!</h1>
              <CommentList data={this.state.data}/> 
              <CommentForm /> 
              < /div>
          );
        }
      });
      // data variable  passed in by parent and comments don't work inside these blocks
      // second step involves this.state - which is private to the component and can be set
      // using this.setState().  when it's updated, the component re-renders.
      // componentDidMount is called automatically by React after a componetn is rendered for the first time.
      
      var CommentList = React.createClass({
      render:  function(){
        var commentNodes = this.props.data.map(function(comment){
          return (
            <Comment author ={comment.author} key={comment.id}>
            {comment.text}
            </Comment>
          );
        });
        return (
          <div className="commentList">
          {commentNodes}
          </div>        
        );
      }
      });
      
      var CommentForm = React.createClass({
        render:  function(){
          return (
            <div className="CommentForm">
            Hello buttwipe!  I am a CommentForm!
            </div>
          );
        }
      });
      
      var Comment = React.createClass({
        rawMarkup: function(){
          var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
          return {__html:  rawMarkup};
        },
        render:  function(){
          return (
            <div className="comment">
            <h2 className="commentAuthor">
            {this.props.author}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
          );
        }
      });
      
      // var data =[
      //   {id:1, author: "Jay Johnston", text: "this is one comment."},
      //   {id:2, author: "Gay Johnston", text: "this is *another* fucking stupid arsed comment."}
      // ]
      //  
      
ReactDOM.render(
    <CommentBox url_jay ="/api/comments" pollInterval={10000}/ > ,  // pass in the data
    document.getElementById('content')
);
console.log("we've left it at the heading:  adding new comments!");