//
//  ProfileViewController.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/24/21.
//

import UIKit
import AlamofireImage

class ProfileViewController: UIViewController {

    let APICaller = APIFunctions()
    
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var emailLabel: UILabel!
    @IBOutlet weak var profilePicView: UIImageView!
    @IBOutlet weak var numberOfProjectsLabel: UILabel!
    
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        nameLabel.text = APICaller.getUserName()
        emailLabel.text = APICaller.getUserEmail()
        let numberOfProjects = String(APICaller.getNumberOfProjects())
        numberOfProjectsLabel.text = numberOfProjects
        
        let urlString = APICaller.getUserPic()
        let url = URL(string: urlString)!
        
        profilePicView.af.setImage(withURL: url)
        
        profilePicView.layer.borderWidth = 1
        profilePicView.layer.masksToBounds = false
        profilePicView.layer.borderColor = UIColor.black.cgColor
        profilePicView.layer.cornerRadius = profilePicView.frame.height/2
        profilePicView.clipsToBounds = true
    }

}

@IBDesignable extension UIView {
    @IBInspectable var cornerRadius: CGFloat {
        get { return layer.cornerRadius }
        set {
              layer.cornerRadius = newValue

              // If masksToBounds is true, subviews will be
              // clipped to the rounded corners.
              layer.masksToBounds = (newValue > 0)
        }
    }
}
