package controllers

import de.htwg.se.scrabble.Scrabble
import javax.inject._
import play.api._
import play.api.mvc._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  val gamecontroller = Scrabble.controller

  def text = gamecontroller.gameToString

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def scrabble() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.scrabble(gamecontroller))
  }

  def newGrid() = Action { implicit request: Request[AnyContent] =>
    gamecontroller.init
    Ok(views.html.scrabble(gamecontroller))
  }

  def submit() = Action { implicit request: Request[AnyContent] =>
    gamecontroller.endTurn
    Ok(views.html.scrabble(gamecontroller))
  }

  def setCard(x: Int, y: Int, count: Int) = Action { implicit request: Request[AnyContent] =>
    gamecontroller.setGrid(x, y, count)
    Ok(views.html.scrabble(gamecontroller))
  }

  def switchCards(currPlayer:String) = Action { implicit request: Request[AnyContent] =>
    gamecontroller.changeHand(currPlayer)
    Ok(views.html.scrabble(gamecontroller))
  }

  def undo() = Action { implicit request: Request[AnyContent] =>
    gamecontroller.undo
    Ok(views.html.scrabble(gamecontroller))
  }

  def redo() = Action { implicit request: Request[AnyContent] =>
    gamecontroller.redo
    Ok(views.html.scrabble(gamecontroller))
  }

  def resize(size:Int) = Action { implicit request: Request[AnyContent] =>
    gamecontroller.createFixedSizeGameField(size)
    Ok(views.html.scrabble(gamecontroller))
  }

  def gridToJson = Action {
    Ok(gamecontroller.memToJson(gamecontroller.createMemento()))
  }

}

