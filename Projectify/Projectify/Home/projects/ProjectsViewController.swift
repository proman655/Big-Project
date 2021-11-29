//
//  ProjectsViewController.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/24/21.
//

import UIKit
import Alamofire

class ProjectsViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    
    let APICaller = APIFunctions()
    var projects = [Project]()
    var projectToEditId:String = ""
    let myRefresControl:UIRefreshControl! = UIRefreshControl()
    
    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadProjects()
        tableView.delegate = self
        tableView.dataSource = self
        myRefresControl.addTarget(self, action: #selector(loadProjects), for: .valueChanged)
        tableView.refreshControl = myRefresControl
    }
    
    @objc func loadProjects() {
        
        let header:HTTPHeaders = [
            "Authorization": "Bearer " + APICaller.getUserToken(),
            "Accept": "application/json"
        ]
        
        AF.request("https://projectify-pm.herokuapp.com/api/notes/", method: .get, parameters: nil, encoding: JSONEncoding.default, headers: header).validate(statusCode: 200 ..< 299).responseJSON { AFdata in
            do {
                guard let jsonObject = try JSONSerialization.jsonObject(with: AFdata.data!) as? [[String: Any]] else {
                    print("Error: Cannot convert data to JSON object")
                    return
                }
                guard let prettyJsonData = try? JSONSerialization.data(withJSONObject: jsonObject, options: .prettyPrinted) else {
                    print("Error: Cannot convert JSON object to Pretty JSON data")
                    return
                }
                guard let prettyPrintedJson = String(data: prettyJsonData, encoding: .utf8) else {
                    print("Error: Could print JSON in String")
                    return
                }
                print(prettyPrintedJson)
                let jsonData = prettyPrintedJson.data(using: .utf8)!
                let decoder = JSONDecoder()
                do {
                    self.projects = try decoder.decode([Project].self, from: jsonData)
                } catch {
                    print(String(describing: error))
                }
            } catch {
                print("Error: Trying to convert JSON data to string")
                return
            }
            self.tableView.reloadData()
            self.myRefresControl.endRefreshing()
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return projects.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let project = projects[indexPath.row]
        let cell = tableView.dequeueReusableCell(withIdentifier: "ProjectCell") as! ProjectCell
        
        cell.titleLabel.text = project.title
        cell.descriptionLabel.text = project.content
        cell.categoryLabel.text = project.category
        cell.dueDateLabel.text = project.dueDate
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {

        //edit button
        let edit = UIContextualAction(style: .normal, title: "Edit") { _, _, _ in
            print("Edit button pressed")
            self.projectToEditId = self.projects[indexPath.row]._id
            self.performSegue(withIdentifier: "editProject", sender: self)
            self.tableView.reloadData()
        }
        
        //delete button
        let delete = UIContextualAction(style: .destructive, title: "Delete") { _, _, _ in
            print("Delete button pressed")
            self.APICaller.deleteProject(id: self.projects[indexPath.row]._id)
            self.projects.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: UITableView.RowAnimation.automatic)
            self.tableView.reloadData()
        }
        
        delete.image = UIImage(systemName: "trash.fill")
        edit.image = UIImage(systemName: "pencil")
        let swipeConfiguration = UISwipeActionsConfiguration(actions: [delete, edit])
        return swipeConfiguration
    }
    
    func tableView(_ tableView: UITableView, leadingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let favorite = UIContextualAction(style: .normal, title: "Favorite") { (action, view, success) in
            print("Favorite button pressed")
            self.APICaller.favoriteProject(id: self.projects[indexPath.row]._id)
            success(true)
        }
        favorite.image = UIImage(systemName: "star.fill")
        favorite.backgroundColor = .systemTeal
        
        return UISwipeActionsConfiguration(actions: [favorite])
    }

    @IBAction func doLogout(_ sender: Any) {
        
    }
    
    // MARK: - Navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?)
    {
        if segue.identifier == "editProject" {
            
            guard let editVC = segue.destination as? EditProjectViewController else {return}
            editVC.projectTotEditId = self.projectToEditId
            
        } else {
            print("could not find segue")
        }
    }
}
